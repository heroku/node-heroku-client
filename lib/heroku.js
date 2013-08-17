var client          = require('./request'),
    _               = require('underscore');

module.exports = Heroku;

function Heroku (options) {
  this.options = options;
}

Heroku.request = client.request;

Heroku.prototype.request = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = this.options;
  } else {
    options = _.extend(_.clone(this.options), options);
  }

  return Heroku.request(options, function (err, body) {
    if (callback) callback(err, body);
  });
};

require('./resourceBuilder').build();
