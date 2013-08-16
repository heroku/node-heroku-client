var https = require('https'),
    memjs = require('memjs'),
    q     = require('q'),
    _     = require('underscore'),
    cache;

exports.request = function request(options, callback) {
  options || (options = {});

  var deferred = q.defer(),
      path     = options.path;

  getCache(path, options.cacheKeyPostfix, function(cachedResponse) {
    var headers = _.extend({
      'Accept': 'application/vnd.heroku+json; version=3',
      'Content-type': 'application/json'
    }, options.headers || {});

    if (cachedResponse) {
      headers['If-None-Match'] = cachedResponse.etag;
    }

    var requestOptions = {
      hostname: 'api.heroku.com',
      port:     443,
      path:     path,
      auth:     ':' + options.token,
      method:   options.method || 'GET',
      headers:  headers
    };

    var req = https.request(requestOptions, function(res) {
      if (res.statusCode === 304 && cachedResponse) {
        deferred.resolve(cachedResponse.body);
        callback(null, cachedResponse.body);
      } else {
        var buffer = '';

        res.on('data', function(data) {
          buffer += data;
        });

        res.on('end', function() {
          if (expectedStatus(res, options)) {
            handleSuccess(res, buffer, options, deferred, callback);
          } else {
            handleFailure(res, buffer, options, deferred, callback);
          }
        });
      }
    });

    if (options.body) {
      var body = JSON.stringify(options.body);

      req.setHeader('Content-length', body.length);
      req.write(body);
    }

    req.on('error', function(err) {
      deferred.reject(err);
      callback(err);
    });

    if (options.timeout && options.timeout > 0) {
      req.setTimeout(options.timeout, function() {
        req.abort();

        var err = new Error('Request took longer than ' + options.timeout + 'ms to complete.');
        deferred.reject(err);
        callback(err);
      });
    }

    req.end();
  });

  return deferred.promise;
}

function expectedStatus(res, options) {
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

function handleFailure(res, buffer, options, deferred, callback) {
  var statusString = options.expectedStatus,
      message;

  if (options.expectedStatus) {
    if (Array.isArray(options.expectedStatus)) {
      statusString = JSON.stringify(options.expectedStatus);
    }

    message = 'Expected response ' + statusString + ', got ' + res.statusCode
  } else {
    message = 'Expected response to be successful, got ' + res.statusCode
  }

  var err = new Error(message);
  err.statusCode = res.statusCode;
  err.body = JSON.parse(buffer || "{}");

  deferred.reject(err);
  callback(err);
}

function handleSuccess(res, buffer, options, deferred, callback) {
  var body = JSON.parse(buffer || '{}');

  setCache(options.path, options.cacheKeyPostfix, res, body);

  deferred.resolve(body);
  callback(null, body);
}

function getCache(path, postfix, callback) {
  if (!cache) return callback(null);

  var key = path + '-' + postfix;

  cache.get(key, function(err, res) {
    callback(JSON.parse(res));
  });
}

function setCache(path, cacheKeyPostfix, res, body) {
  if ((!cache) || !(res.headers.etag)) return;

  var key = path + '-' + cacheKeyPostfix;
  var value = JSON.stringify({
    body: body,
    etag: res.headers.etag
  });

  cache.set(key, value);
}

exports.connectCacheClient = function connectCacheClient() {
  cache = memjs.Client.create();
};

if (process.env.NODE_ENV === 'production') {
  exports.connectCacheClient();
}
