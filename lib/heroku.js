var Request = require('./request'),
    _       = require('lodash');

module.exports = Heroku;

function Heroku (options) {
  this.options = options;
}

Heroku.configure = function (config) {
  if (config.cache) {
    Request.connectCacheClient();
  }

  return this;
}

Heroku.request = Request.request;

Heroku.prototype.request = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = this.options;
  } else {
    options = _.defaults(options, this.options);
  }

  return Request.request(options, function (err, body) {
    if (callback) callback(err, body);
  });
};

require('./resourceBuilder').build();
