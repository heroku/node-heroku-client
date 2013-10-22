var https = require('https'),
    agent = new https.Agent({ maxSockets: Number(process.env.HEROKU_CLIENT_MAX_SOCKETS) || 5000 }),
    memjs = require('memjs'),
    q     = require('q'),
    _     = require('lodash'),
    cache;


module.exports = Request;


/*
 * Create an object capable of making API
 * calls. Accepts custom request options and
 * a callback function.
 */
function Request (options, callback) {
  this.options  = options || {};
  this.callback = callback;
  this.deferred = q.defer();
  this.nextRange = 'id ]..; max=1000';

  _.bindAll(this);
}


/*
 * Instantiate a Request object and makes a
 * request, returning the request promise.
 */
Request.request = function request (options, callback) {
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
Request.prototype.request = function request () {
  this.getCache(this.performRequest);
  return this.deferred.promise;
};


/*
 * Perform the actual API request.
 */
Request.prototype.performRequest = function performRequest (cachedResponse) {
  var headers,
      requestOptions,
      req;

  this.cachedResponse = cachedResponse;

  headers = _.extend({
    'Accept': 'application/vnd.heroku+json; version=3',
    'Content-type': 'application/json',
    'Range': this.nextRange
  }, this.options.headers || {});

  if (this.cachedResponse) {
    headers['If-None-Match'] = this.cachedResponse.etag;
  }

  requestOptions = {
    agent:    agent,
    hostname: 'api.heroku.com',
    port:     443,
    path:     this.options.path,
    auth:     ':' + this.options.token,
    method:   this.options.method || 'GET',
    headers:  headers
  };

  req = https.request(requestOptions, this.handleResponse);

  this.writeBody(req);
  this.setRequestTimeout(req);

  req.on('error', this.handleError);

  req.end();
};



/*
 * If the cache client is alive, get the
 * cached response from the cache.
 */
Request.prototype.getCache = function getCache (callback) {
  if (!cache) return callback(null);

  var key = this.options.path + '-' + this.nextRange + '-' + this.options.cacheKeyPostfix;

  cache.get(key, function (err, res) {
    callback(JSON.parse(res));
  });
};


/*
 * Handle an API response, returning the
 * cached body if it's still valid, or the
 * new API response.
 */
Request.prototype.handleResponse = function handleResponse (res) {
  var _this = this,
      buffer;

  if (res.statusCode === 304 && this.cachedResponse) {
    if (this.cachedResponse.nextRange) {
      this.nextRequest(this.cachedResponse.nextRange, this.cachedResponse.body);
    } else {
      this.updateAggregate(this.cachedResponse.body);
      this.deferred.resolve(this.aggregate);
      this.callback(null, this.aggregate);
    }
  } else {
    buffer = '';

    res.on('data', function (data) {
      buffer += data;
    });

    res.on('end', function () {
      if (res.statusCode.toString().match(/^2\d{2}$/)) {
        _this.handleSuccess(res, buffer);
      } else {
        _this.handleFailure(res, buffer);
      }
    });
  }
};


/*
 * If the request options include a body,
 * write the body to the request and set
 * an appropriate 'Content-length' header.
 */
Request.prototype.writeBody = function writeBody (req) {
  if (!this.options.body) return;

  var body = JSON.stringify(this.options.body);

  req.setHeader('Content-length', body.length);
  req.write(body);
}


/*
 * If the request options include a timeout,
 * set the timeout and provide a callback
 * function in case the request exceeds the
 * timeout period.
 */
Request.prototype.setRequestTimeout = function setRequestTimeout (req) {
  var _this = this;

  if (!this.options.timeout) return;

  req.setTimeout(this.options.timeout, function () {
    var err = new Error('Request took longer than ' + _this.options.timeout + 'ms to complete.');

    req.abort();

    _this.deferred.reject(err);
    _this.callback(err);
  });
}


/*
 * In the event of an error in performing
 * the API request, reject the deferred
 * object and return an error to the callback.
 */
Request.prototype.handleError = function handleError (err) {
  this.deferred.reject(err);
  this.callback(err);
}


/*
 * In the event of a non-successful API request,
 * fail with an appropriate error message and
 * status code.
 */
Request.prototype.handleFailure = function handleFailure (res, buffer) {
  var options      = this.options,
      callback     = this.callback,
      deferred     = this.deferred,
      message      = 'Expected response to be successful, got ' + res.statusCode,
      err;

  err = new Error(message);
  err.statusCode = res.statusCode;
  err.body = JSON.parse(buffer || "{}");

  deferred.reject(err);
  callback(err);
}


/*
 * In the event of a successful API response,
 * write the response to the cache and resolve
 * with the response body.
 */
Request.prototype.handleSuccess = function handleSuccess (res, buffer) {
  var options      = this.options,
      callback     = this.callback,
      deferred     = this.deferred,
      body         = JSON.parse(buffer || '{}');

  this.setCache(options.path, options.cacheKeyPostfix, res, body);

  if (res.headers['next-range']) {
    this.nextRequest(res.headers['next-range'], body);
  } else {
    this.updateAggregate(body);
    deferred.resolve(this.aggregate);
    callback(null, this.aggregate);
  }
}


/*
 * Since this request isn't the full response (206 or
 * 304 with a cached Next-Range), perform the next
 * request for more data.
 */
Request.prototype.nextRequest = function nextRequest (nextRange, body) {
  this.updateAggregate(body);
  this.nextRange = nextRange;
  this.request();
}


/*
 * If the cache client is alive, write the
 * provided response and body to the cache.
 */
Request.prototype.setCache = function setCache (path, cacheKeyPostfix, res, body) {
  var key, value;

  if ((!cache) || !(res.headers.etag)) return;

  key = path + '-' + this.nextRange + '-' +  cacheKeyPostfix;

  value = JSON.stringify({
    body: body,
    etag: res.headers.etag,
    nextRange: res.headers['next-range']
  });

  cache.set(key, value);
}


/*
 * If given an object, sets aggregate to object,
 * otherwise concats array onto aggregate.
 */
Request.prototype.updateAggregate = function updateAggregate (aggregate) {
  if (aggregate instanceof Array) {
    this.aggregate || (this.aggregate = []);
    this.aggregate = this.aggregate.concat(aggregate);
  } else {
    this.aggregate = aggregate;
  }
}


/*
 * Connect a cache client.
 */
Request.connectCacheClient = function connectCacheClient() {
  cache = memjs.Client.create();
};
