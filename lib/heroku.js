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
  if (config.cache && !process.env.HEROKU_CLIENT_ENCRYPTION_SECRET) {
    console.error('Must supply HEROKU_CLIENT_ENCRYPTION_SECRET in order to cache');
    process.exit(1);
  }

  if (config.cache) {
    Request.connectCacheClient();
  }

  return this;
};

Heroku.request = Request.request;

Heroku.prototype.request = function request(options, callback) {
  var key;

  if (typeof options === 'function') {
    callback = options;
    options = this.options;
  } else {
    for (key in this.options) {
      if (Object.keys(options).indexOf(key) == -1) options[key] = this.options[key];
    }
  }

  return Request.request(options, function requestCallback(err, body) {
    if (callback) callback(err, body);
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

Heroku.prototype.delete = function _delete (path, callback) {
  return this.request({ method: 'DELETE', path: path }, callback);
};

require('./resourceBuilder').build();
