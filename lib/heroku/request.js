var https = require('https'),
    memjs = require('memjs'),
    q     = require('q'),
    _     = require('underscore');

if (process.env.NODE_ENV === 'production') {
  var cache = memjs.Client.create();
}

module.exports = function request(path, options, callback) {
  var deferred = q.defer();

  options || (options = {});

  getCache(options.cacheKeyPostfix, path, function(cachedResponse) {
    var headers = _.extend({
      'Accept': 'application/vnd.heroku+json; version=3',
      'If-None-Match': cachedResponse ? cachedResponse.etag : ''
    }, options.headers || {});

    var requestOptions = {
      hostname: 'api.heroku.com',
      port:     443,
      path:     path,
      query:    options.query || {},
      auth:     ':' + options.key,
      method:   options.method || 'GET',
      headers:  headers
    };

    var req = https.request(requestOptions, function(res) {
      if (res.statusCode === 304 && cachedResponse) {
        deferred.resolve(cachedResponse.body);
        callback(null, cachedResponse.body);
      } else if (options.expectedResponse && (res.statusCode !== options.expectedResponse)) {
        var err = new Error('Expected response ' + options.expectedResponse + ', got ' + res.statusCode);
        err.statusCode = res.statusCode;

        deferred.reject(err);
        callback(err);
      } else {
        var buffer = '';

        res.on('data', function(data) {
          buffer += data;
        });

        res.on('end', function() {
          var body = JSON.parse(buffer);

          setCache(path, options.cacheKeyPostfix, res, body);

          deferred.resolve(body);
          callback(null, body);
        });
      }
    });

    req.on('error', function(err) {
      deferred.reject(err);
      callback(err);
    });

    req.end();
  });

  return deferred.promise;
}

function getCache(path, postfix, callback) {
  if (!(process.env.NODE_ENV === 'production')) return callback(null);

  var key = path + '-' + cacheKeyPostfix;

  cache.get(key, function(err, res) {
    callback(JSON.parse(res));
  });
}

function setCache(path, cacheKeyPostfix, res, body) {
  if (!(process.env.NODE_ENV === 'production') || !(res.headers.etag)) return;

  var key = path + '-' + cacheKeyPostfix;
  var value = JSON.stringify({
    body: body,
    etag: res.headers.etag,
    statusCode: res.statusCode
  });

  cache.set(key, value);
}
