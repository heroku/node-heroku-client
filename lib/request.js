var https = require('https'),
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

  _.bindAll(this); }


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
    'Content-type': 'application/json'
  }, this.options.headers || {});

  if (this.cachedResponse) {
    headers['If-None-Match'] = this.cachedResponse.etag;
  }

  requestOptions = {
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

  var key = this.options.path + '-' + this.options.cacheKeyPostfix;

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
    this.deferred.resolve(this.cachedResponse.body);
    this.callback(null, this.cachedResponse.body);
  } else {
    buffer = '';

    res.on('data', function (data) {
      buffer += data;
    });

    res.on('end', function () {
      if (_this.expectedStatus(res)) {
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
 * Check that the status from the API response
 * matches the one(s) that are expected.
 */
Request.prototype.expectedStatus = function expectedStatus (res) {
  var options = this.options;

  if (options.expectedStatus) {
    if (Array.isArray(options.expectedStatus)) {
      return options.expectedStatus.indexOf(res.statusCode) > -1
    } else {
      return res.statusCode === options.expectedStatus;
    }
  } else {
    return res.statusCode.toString().match(/^2\d{2}$/);
  }
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
      statusString = options.expectedStatus,
      message,
      err;

  if (options.expectedStatus) {
    if (Array.isArray(options.expectedStatus)) {
      statusString = JSON.stringify(options.expectedStatus);
    }

    message = 'Expected response ' + statusString + ', got ' + res.statusCode
  } else {
    message = 'Expected response to be successful, got ' + res.statusCode
  }

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

  deferred.resolve(body);
  callback(null, body);
}


/*
 * If the cache client is alive, write the
 * provided response and body to the cache.
 */
Request.prototype.setCache = function setCache (path, cacheKeyPostfix, res, body) {
  var key, value;

  if ((!cache) || !(res.headers.etag)) return;

  key = path + '-' + cacheKeyPostfix;

  value = JSON.stringify({
    body: body,
    etag: res.headers.etag
  });

  cache.set(key, value);
}


/*
 * Connect a cache client.
 */
Request.connectCacheClient = function connectCacheClient() {
  cache = memjs.Client.create();
};


/*
 * Automatically connect a cache client if
 * NODE_ENV is set to 'production'.
 */
if (process.env.NODE_ENV === 'production') {
  Request.connectCacheClient();
}
