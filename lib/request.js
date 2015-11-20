'use strict';

var http      = require('http');
var https     = require('https');
var tunnel    = require('tunnel-agent');
var extend    = require('util')._extend;
var q         = require('q');
var URL       = require('./url');
var pjson     = require('../package.json');

module.exports = Request;


/*
 * Create an object capable of making API
 * calls. Accepts custom request options and
 * a callback function.
 */
function Request(options, callback) {
  this.options      = options || {};
  this.debug        = options.debug;
  this.debugHeaders = options.debugHeaders;
  if (this.debug) {
    q.longStackSupport = true;
  }
  var url         = URL(options.host || 'https://api.heroku.com');
  this.host       = url.host;
  this.port       = url.port;
  this.secure     = url.secure;
  this.partial    = options.partial;
  this.callback   = callback;
  this.deferred   = q.defer();
  this.userAgent  = options.userAgent || 'node-heroku-client/' + pjson.version;
  this.parseJSON  = options.hasOwnProperty('parseJSON') ? options.parseJSON : true;
  this.nextRange  = 'id ]..; max=1000';
  this.logger     = options.logger;
  this.cache      = options.cache;
  this.middleware = options.middleware || function (_, cb) {cb();};
  if (process.env.HEROKU_HTTP_PROXY_HOST) {
    var tunnelFunc;
    if (this.secure) {
      tunnelFunc = tunnel.httpsOverHttp;
    } else {
      tunnelFunc = tunnel.httpOverHttp;
    }
    this.agent = tunnelFunc({
      proxy: {
        host: process.env.HEROKU_HTTP_PROXY_HOST,
        port: process.env.HEROKU_HTTP_PROXY_PORT || 8080
      }
    });
  } else {
    if (this.secure) {
      this.agent = new https.Agent({ maxSockets: Number(process.env.HEROKU_CLIENT_MAX_SOCKETS) || 5000 });
    } else {
      this.agent = new http.Agent({ maxSockets: Number(process.env.HEROKU_CLIENT_MAX_SOCKETS) || 5000 });
    }
  }
}


/*
 * Instantiate a Request object and makes a
 * request, returning the request promise.
 */
Request.request = function request(options, callback) {
  var req = new Request(options, function (err, body) {
    if (callback) { callback(err, body); }
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
Request.prototype.performRequest = function performRequest() {
  var req;

  this.options.headers = this.options.headers || {};
  var headers = extend({
    'Accept': 'application/vnd.heroku+json; version=3',
    'Content-type': 'application/json',
    'User-Agent': this.userAgent,
    'Range': this.nextRange
  }, this.options.headers);

  // remove null|undefined headers
  for (var k in headers) {
    if (headers.hasOwnProperty(k)) {
      if (headers[k] === null || headers[k] === undefined) {
        delete headers[k];
      }
    }
  }

  var requestOptions = {
    agent:               this.agent,
    host:                this.host,
    port:                this.port,
    path:                this.options.path,
    auth:                this.options.auth || ':' + this.options.token,
    method:              this.options.method || 'GET',
    rejectUnauthorized:  this.options.rejectUnauthorized,
    headers:             headers
  };

  if (this.cachedResponse) {
    headers['If-None-Match'] = this.cachedResponse.etag;
  }

  if (this.secure) {
    req = https.request(requestOptions, this.handleResponse.bind(this));
  } else {
    req = http.request(requestOptions, this.handleResponse.bind(this));
  }

  this.logRequest(req);
  this.writeBody(req);
  this.setRequestTimeout(req);

  req.on('error', this.handleError.bind(this));

  req.end();

  return this.deferred.promise;
};

/*
 * Handle an API response, returning the API response.
 */
Request.prototype.handleResponse = function handleResponse(res) {
  var self = this;
  this.middleware(res, function () {
    self.logResponse(res);
    if (res.statusCode === 304 && self.cachedResponse) {
      if (self.cachedResponse.nextRange) {
        self.nextRequest(self.cachedResponse.nextRange, self.cachedResponse.body);
      } else {
        self.updateAggregate(self.cachedResponse.body);
        self.deferred.resolve(self.aggregate);
        self.callback(null, self.aggregate);
      }
      return;
    }
    concat(res, function (data) {
      if (self.debug) {
        console.error('<-- ' + data);
      }
      if (res.statusCode.toString().match(/^2\d{2}$/)) {
        self.handleSuccess(res, data);
      } else {
        self.handleFailure(res, data);
      }
    });
  });
};

function printHeaders (headers) {
  var key;
  var value;
  for (key in headers) {
    if (headers.hasOwnProperty(key)) {
      value = key.toUpperCase() === 'AUTHORIZATION' ? 'REDACTED' : headers[key];
      console.error('    ' + key + '=' + value);
    }
  }
}

Request.prototype.logRequest = function logRequest(req) {
  if (this.debug) {
    console.error('--> ' + req.method + ' ' + req.path);
  }
  if (this.debugHeaders) {
    printHeaders(req._headers);
  }
};

/*
 * Log the API response.
 */
Request.prototype.logResponse = function logResponse(res) {
  if (this.logger) {
    this.logger.log({
      status        : res.statusCode,
      content_length: res.headers['content-length'],
      request_id    : res.headers['request-id']
    });
  }
  if (this.debug) {
    console.error('<-- ' + res.statusCode + ' ' + res.statusMessage);
  }
  if (this.debugHeaders) {
    printHeaders(res.headers);
  }
};


/*
 * If the request options include a body,
 * write the body to the request and set
 * an appropriate 'Content-length' header.
 */
Request.prototype.writeBody = function writeBody(req) {
  if (this.options.body) {
    var body = this.options.body;
    if (this.options.json !== false) { body = JSON.stringify(body); }
    if (this.debug) {
      console.error('--> ' + body);
    }

    req.setHeader('Content-length', Buffer.byteLength(body, 'utf8'));
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
  if (!this.options.timeout) { return; }

  req.setTimeout(this.options.timeout, function () {
    var err = new Error('Request took longer than ' + this.options.timeout + 'ms to complete.');

    req.abort();

    this.deferred.reject(err);
    this.callback(err);
  }.bind(this));
};

/*
 * Get the request body, and parse it (or not) as appropriate.
 * - Parse JSON by default.
 * - If parseJSON is `false`, it will not parse.
 */
Request.prototype.parseBody = function parseBody(body) {
  if (this.parseJSON) {
    return JSON.parse(body || '{}');
  } else {
    return body;
  }
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
  err.body = this.parseBody(buffer);

  deferred.reject(err);
  callback(err);
};


/*
 * In the event of a successful API response,
 * respond with the response body.
 */
Request.prototype.handleSuccess = function handleSuccess(res, buffer) {
  var callback     = this.callback;
  var deferred     = this.deferred;
  var body         = this.parseBody(buffer);

  this.setCache(res, body);

  if (!this.partial && res.headers['next-range']) {
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
  // The initial range header passed in (if there was one), is no longer valid, and should no longer take precedence
  delete (this.options.headers.Range);
  this.request();
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
 * If the cache client is alive, get the
 * cached response from the cache.
 */
Request.prototype.getCache = function getCache(callback) {
  if (!this.cache) { return callback(null); }
  var key = this.getCacheKey();
  var self = this;
  this.cache.store.get(key, function (err, res) {
    if (err) { return self.deferred.reject(err); }
    self.cachedResponse = res ? self.cache.encryptor.decrypt(res.toString()) : res;
    callback();
  });
};

/*
 * If the cache client is alive, write the
 * provided response and body to the cache.
 */
Request.prototype.setCache = function setCache(res, body) {
  if ((!this.cache) || !(res.headers.etag)) { return; }

  var key = this.getCacheKey();
  var value = {
    body     : body,
    etag     : res.headers.etag,
    nextRange: res.headers['next-range']
  };

  if (this.debug) {
    console.error('<-- writing to cache');
  }

  value = this.cache.encryptor.encrypt(value);
  this.cache.store.set(key, value);
};

/*
 * Returns a cache key comprising the request path,
 * the 'Next Range' header, and the user's API token.
 */
Request.prototype.getCacheKey = function getCacheKey() {
  var path = JSON.stringify([this.options.path, this.nextRange, this.options.token]);
  return this.cache.encryptor.hmac(path);
};

function concat (stream, callback) {
  var strings = [];
  stream.on('data', function (data) {
    strings.push(data);
  });
  stream.on('end', function () {
    callback(strings.join(''));
  });
}
