var https = require('https'),
    memjs = require('memjs'),
    q     = require('q'),
    _     = require('lodash'),
    cache;


module.exports = Request;


function Request (options, callback) {
  this.options  = options || {};
  this.callback = callback;
  this.deferred = q.defer();

  _.bindAll(this);
}


Request.request = function request (options, callback) {
  var req = new Request(options, function (err, body) {
    if (callback) callback(err, body);
  });

  return req.request();
};


Request.prototype.request = function request () {
  this.getCache(this.performRequest);
  return this.deferred.promise;
};


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


Request.prototype.getCache = function getCache (callback) {
  if (!cache) return callback(null);

  var key = this.options.path + '-' + this.options.cacheKeyPostfix;

  cache.get(key, function (err, res) {
    callback(JSON.parse(res));
  });
};


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


Request.prototype.writeBody = function writeBody (req) {
  if (!this.options.body) return;

  var body = JSON.stringify(this.options.body);

  req.setHeader('Content-length', body.length);
  req.write(body);
}


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


Request.prototype.handleError = function handleError (err) {
  this.deferred.reject(err);
  this.callback(err);
}


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


Request.prototype.handleSuccess = function handleSuccess (res, buffer) {
  var options      = this.options,
      callback     = this.callback,
      deferred     = this.deferred,
      body         = JSON.parse(buffer || '{}');

  this.setCache(options.path, options.cacheKeyPostfix, res, body);

  deferred.resolve(body);
  callback(null, body);
}


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


Request.connectCacheClient = function connectCacheClient() {
  cache = memjs.Client.create();
};


if (process.env.NODE_ENV === 'production') {
  Request.connectCacheClient();
}
