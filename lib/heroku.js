var Request = require('./request'),
    _       = require('lodash');

module.exports = Heroku;

function Heroku (options) {
  this.options = options;
}

Heroku.configure = function configure (config) {
  if (config.cache && !process.env.HEROKU_CLIENT_ENCRYPTION_SECRET) {
    console.error('Must supply HEROKU_CLIENT_ENCRYPTION_SECRET in order to cache');
    process.exit(1);
  }

  if (config.cache) {
    Request.connectCacheClient();
  }

  return this;
}

Heroku.request = Request.request;

Heroku.prototype.request = function request (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = this.options;
  } else {
    options = _.defaults(options, this.options);
  }

  return Request.request(options, function requestCallback (err, body) {
    if (callback) callback(err, body);
  });
};

require('./resourceBuilder').build();
