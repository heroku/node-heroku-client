var Request = require('./request'),
    _       = require('lodash');

module.exports = Heroku;

function Heroku (options) {
  this.options = options;
}

Heroku.request = Request.request;

Heroku.prototype.request = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = this.options;
  } else {
    options = _.extend(_.clone(this.options), options);
  }

  return Request.request(options, function (err, body) {
    if (callback) callback(err, body);
  });
};

require('./resourceBuilder').build();
