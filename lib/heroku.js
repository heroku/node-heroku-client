'use strict';

var Request = require('./request');

module.exports = Heroku;

function Heroku(options) {
  this.options = options;
}

Heroku.createClient = function createClient(options) {
  return new Heroku(options);
};

Heroku.configure = function configure(config) {
  var cache = config.cache;
  var key   = config.key || process.env.HEROKU_CLIENT_ENCRYPTION_SECRET;

  if (cache === true) {
    cache = require('memjs').Client.create();
  }

  if (cache) {
    if (typeof(cache.get) !== 'function' || typeof(cache.set) !== 'function') {
      console.error('cache must define get(key, cb(err, value)) and set(key, value) functions');
      process.exit(1);
    }

    if (!key) {
      console.error('Must supply key or set HEROKU_CLIENT_ENCRYPTION_SECRET environment variable in order to cache');
      process.exit(1);
    }

    Request.connectCacheClient({
      cache: cache,
      key  : key
    });
  }

  return this;
};

Heroku.request = Request.request;

Heroku.prototype.request = function request(options, callback) {
  var key;

  if (typeof(options) === 'function') {
    callback = options;
    options  = this.options;
  } else {
    for (key in this.options) {
      if (this.options.hasOwnProperty(key)) {
        if (!options.hasOwnProperty(key)) {
          options[key] = this.options[key];
        }
      }
    }
  }

  return Request.request(options, function requestCallback(err, body) {
    if (callback) { callback(err, body); }
  });
};

Heroku.prototype.get = function get(path, callback) {
  return this.request({ method: 'GET', path: path }, callback);
};

Heroku.prototype.post = function post(path, body, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = {};
  }

  return this.request({ method: 'POST', path: path, body: body }, callback);
};

Heroku.prototype.patch = function patch(path, body, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = {};
  }

  return this.request({ method: 'PATCH', path: path, body: body }, callback);
};

Heroku.prototype.delete = function _delete(path, callback) {
  return this.request({ method: 'DELETE', path: path }, callback);
};

require('./resourceBuilder').build();
