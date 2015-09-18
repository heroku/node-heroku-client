'use strict';

var Request = require('./request');
var extend  = require('util')._extend;

module.exports = Heroku;

function Heroku(options) {
  this.options = options;
}

Heroku.createClient = function createClient(options) {
  return new Heroku(options);
};

Heroku.request = Request.request;

Heroku.prototype.request = function request(options, callback) {
  var key;

  if (typeof(options) === 'function') {
    callback = options;
    options  = this.options;
  } else {
    this.options = this.options || {};
    // merge headers
    options.headers = extend(extend({}, this.options.headers), options.headers);
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
