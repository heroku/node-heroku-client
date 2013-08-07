var inflection = require('inflection'),
    path       = require('path'),
    client     = require('./request'),
    resources  = require('./resources').resources,
    _          = require('underscore');

exports.request = client.request;
exports.Heroku  = Heroku;

function Heroku(options) {
  this.request = function(path, _options, callback) {
    if (typeof _options === 'function') {
      callback = _options;
      _options = options;
    } else {
      _options = _.extend(_.clone(options), _options);
    }

    return client.request(path, _options, function(err, body) {
      if (callback) callback(err, body);
    });
  };

  for (var key in resources) {
    bindResource(this, resources[key], key);
  }
}

function bindResource(target, resource, resourceName) {
  var actions = resource.actions,
      name    = getName(resourceName, actions),
      functionName, namespace;

  target[name] = {};
  namespace = target[name];

  for (var key in actions) {
    functionName = key.toLowerCase();
    namespace[functionName] = getFunc(target, actions[key]);
    namespace[functionName]._info = actions[key];
  }
}

function getName(resourceName) {
  var name = resourceName.toLowerCase();
  name = inflection.dasherize(name).replace(/-/g, '_');
  name = inflection.camelize(name, true);

  return name;
}

function getFunc(target, action) {
  return function() {
    var options = {
      method: action.method
    }

    if (typeof arguments[arguments.length - 1] === 'function') {
      var callback = arguments[arguments.length - 1];
    }

    var requestPath = action.path;

    for (var i = 0; i < arguments.length; i++) {
      requestPath = requestPath.replace(/{[a-z_]+}/, arguments[i]);
    }

    return target.request(requestPath, options, callback);
  }
}
