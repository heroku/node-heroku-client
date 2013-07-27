var request = require('./request'),
    _       = require('underscore');

exports.request = request;
exports.Heroku  = Heroku;

var resources = {
  account:  require('./resources/account'),
  addons:   require('./resources/addons'),
  apps:     require('./resources/apps')
};

function Heroku(options) {
  this.options = options;

  this.request = function(path, _options, callback) {
    if (typeof _options === 'function') {
      callback = _options;
      _options = options;
    } else {
      _options = _.extend(_.clone(options), _options);
    }

    return request(path, _options, function(err, body) {
      if (callback) callback(err, body);
    });
  };

  bindModules(this, this, resources);
}

// Resursively binds all functions in the module to
// master, while preserving namespace.
//
function bindModules(master, target, module) {
  for (var key in module) {
    target[key] = _.bind(module[key], master);
    bindModules(master, target[key], module[key]);
  }
}
