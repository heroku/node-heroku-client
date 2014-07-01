'use strict';

var http      = require('http');
var https     = require('https');
var concat    = require('concat-stream');
var encryptor = require('./encryptor');
var lazy      = require('lazy.js');
var memjs     = require('memjs');
var q         = require('q');
var cache;


module.exports = Request;


/*
 * Create an object capable of making API
 * calls. Accepts custom request options and
 * a callback function.
 */
function Request(options, callback) {
  this.options  = options || {};
  this.host     = options.host || 'api.heroku.com';
  this.callback = callback;
  this.deferred = q.defer();
  this.nextRange = 'id ]..; max=1000';
}


/*
 * Instantiate a Request object and makes a
 * request, returning the request promise.
 */
Request.request = function request(options, callback) {
  var req = new Request(options, function (err, body) {
    if (callback) callback(err, body);
  });

  return req.request();
};


/*
 * Check for a cached response, then
 * perform an API request. Return the
 * request object's promise.
 */
Request.prototype.request = function request() {
  this.getCache(this.performRequest.bind(this));
  return this.deferred.promise;
};


/*
 * Perform the actual API request.
 */
Request.prototype.performRequest = function performRequest(cachedResponse) {
  var defaultRequestOptions,
      headers,
      key,
      requestOptions,
      req;

  this.cachedResponse = cachedResponse;

  headers = {
    'Accept': 'application/vnd.heroku+json; version=3',
    'Content-type': 'application/json',
    'Range': this.nextRange
  };

  this.options.headers = this.options.headers || {};

  for (key in this.options.headers) {
    headers[key] = this.options.headers[key];
  }

  if (this.cachedResponse) {
    headers['If-None-Match'] = this.cachedResponse.etag;
  }

  defaultRequestOptions = {
    auth: ':' + this.options.token,
    method: this.options.method || 'GET',
    headers: headers
  };

  requestOptions = this.getRequestOptions(defaultRequestOptions);

  if (process.env.HEROKU_HTTP_PROXY_HOST) {
    headers.Host = this.host;
    req = http.request(requestOptions, this.handleResponse.bind(this));
  } else {
    req = https.request(requestOptions, this.handleResponse.bind(this));
  }

  this.writeBody(req);
  this.setRequestTimeout(req);

  req.on('error', this.handleError.bind(this));

  req.end();
};

/*
 * Set return the correct request options, based on whether or not we're using
 * an HTTP proxy.
 */
Request.prototype.getRequestOptions = function getRequestOptions(defaultOptions) {
  var requestOptions;

  if (process.env.HEROKU_HTTP_PROXY_HOST) {
    requestOptions = {
      agent: new http.Agent({ maxSockets: Number(process.env.HEROKU_CLIENT_MAX_SOCKETS) || 5000 }),
      host : process.env.HEROKU_HTTP_PROXY_HOST,
      port : process.env.HEROKU_HTTP_PROXY_PORT || 8080,
      path : 'https://' + this.host + this.options.path
    };
  } else {
    requestOptions = {
      agent: new https.Agent({ maxSockets: Number(process.env.HEROKU_CLIENT_MAX_SOCKETS) || 5000 }),
      host : this.host,
      port : 443,
      path : this.options.path
    };
  }

  return lazy(requestOptions).merge(defaultOptions).toObject();
};

/*
 * Handle an API response, returning the
 * cached body if it's still valid, or the
 * new API response.
 */
Request.prototype.handleResponse = function handleResponse(res) {
  var self      = this;
  var resReader = concat(directResponse);

  if (res.statusCode === 304 && this.cachedResponse) {
    if (this.cachedResponse.nextRange) {
      this.nextRequest(this.cachedResponse.nextRange, this.cachedResponse.body);
    } else {
      this.updateAggregate(this.cachedResponse.body);
      this.deferred.resolve(this.aggregate);
      this.callback(null, this.aggregate);
    }
  } else {
    res.pipe(resReader);
  }

  function directResponse(data) {
    if (res.statusCode.toString().match(/^2\d{2}$/)) {
      self.handleSuccess(res, data);
    } else {
      self.handleFailure(res, data);
    }
  }
};


/*
 * If the request options include a body,
 * write the body to the request and set
 * an appropriate 'Content-length' header.
 */
Request.prototype.writeBody = function writeBody(req) {
  if (this.options.body) {
    var body = JSON.stringify(this.options.body);

    req.setHeader('Content-length', body.length);
    req.write(body);
  } else {
    req.setHeader('Content-length', 0);
  }
};


/*
 * If the request options include a timeout,
 * set the timeout and provide a callback
 * function in case the request exceeds the
 * timeout period.
 */
Request.prototype.setRequestTimeout = function setRequestTimeout(req) {
  if (!this.options.timeout) return;

  req.setTimeout(this.options.timeout, function () {
    var err = new Error('Request took longer than ' + this.options.timeout + 'ms to complete.');

    req.abort();

    this.deferred.reject(err);
    this.callback(err);
  }.bind(this));
};


/*
 * In the event of an error in performing
 * the API request, reject the deferred
 * object and return an error to the callback.
 */
Request.prototype.handleError = function handleError(err) {
  this.deferred.reject(err);
  this.callback(err);
};


/*
 * In the event of a non-successful API request,
 * fail with an appropriate error message and
 * status code.
 */
Request.prototype.handleFailure = function handleFailure(res, buffer) {
  var callback     = this.callback;
  var deferred     = this.deferred;
  var message      = 'Expected response to be successful, got ' + res.statusCode;
  var err;

  err = new Error(message);
  err.statusCode = res.statusCode;
  err.body = JSON.parse(buffer || "{}");

  deferred.reject(err);
  callback(err);
};


/*
 * In the event of a successful API response,
 * write the response to the cache and resolve
 * with the response body.
 */
Request.prototype.handleSuccess = function handleSuccess(res, buffer) {
  var callback     = this.callback;
  var deferred     = this.deferred;
  var body         = JSON.parse(buffer || '{}');

  this.setCache(res, body);

  if (res.headers['next-range']) {
    this.nextRequest(res.headers['next-range'], body);
  } else {
    this.updateAggregate(body);
    deferred.resolve(this.aggregate);
    callback(null, this.aggregate);
  }
};


/*
 * Since this request isn't the full response (206 or
 * 304 with a cached Next-Range), perform the next
 * request for more data.
 */
Request.prototype.nextRequest = function nextRequest(nextRange, body) {
  this.updateAggregate(body);
  this.nextRange = nextRange;
  this.request();
};


/*
 * If the cache client is alive, get the
 * cached response from the cache.
 */
Request.prototype.getCache = function getCache(callback) {
  if (!cache) return callback(null);

  var key = this.getCacheKey();

  cache.get(key, function (err, res) {
    res = res ? encryptor.decrypt(res.toString()) : res;
    callback(JSON.parse(res));
  });
};


/*
 * If the cache client is alive, write the
 * provided response and body to the cache.
 */
Request.prototype.setCache = function setCache(res, body) {
  if ((!cache) || !(res.headers.etag)) return;

  var key = this.getCacheKey();
  var value = JSON.stringify({
    body: body,
    etag: res.headers.etag,
    nextRange: res.headers['next-range']
  });

  value = encryptor.encrypt(value);

  cache.set(key, value);
};


/*
 * Returns a cache key comprising the request path,
 * the 'Next Range' header, and the user's API token.
 */
Request.prototype.getCacheKey = function getCacheKey() {
  return encryptor.encrypt(this.options.path + this.nextRange + this.options.token);
};


/*
 * If given an object, sets aggregate to object,
 * otherwise concats array onto aggregate.
 */
Request.prototype.updateAggregate = function updateAggregate(aggregate) {
  if (aggregate instanceof Array) {
    this.aggregate = this.aggregate || [];
    this.aggregate = this.aggregate.concat(aggregate);
  } else {
    this.aggregate = aggregate;
  }
};


/*
 * Connect a cache client.
 */
Request.connectCacheClient = function connectCacheClient() {
  cache = memjs.Client.create();
};
