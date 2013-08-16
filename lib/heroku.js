var inflection = require('inflection'),
    client     = require('./request'),
    resources  = require('./resources').resources,
    _          = require('underscore');

exports.request = client.request;
exports.Heroku  = Heroku;

function Heroku(options) {
  this.request = function(_options, callback) {
    if (typeof _options === 'function') {
      callback = _options;
      _options = options;
    } else {
      _options = _.extend(_.clone(options), _options);
    }

    return client.request(_options, function(err, body) {
      if (callback) callback(err, body);
    });
  };
}

_.each(resources, function (resource) {
  buildResource(resource);
});

function buildResource (resource) {
  _.each(resource.actions, function (action, actionName) {
    buildAction(action, actionName);
  });
}

function buildAction (action, actionName) {
  var constructor = getResource(action.path);

  constructor.prototype[getName(actionName)] = function (body, callback) {
    var requestPath = action.path,
        callback;

    this.params.forEach(function (param) {
      requestPath = requestPath.replace(/{[a-z_]+}/, param);
    });

    var options = {
      method: action.method,
      path: requestPath,
      expectedStatus: action.statuses
    };

    if (typeof arguments[0] === 'function') {
      callback = body;
    } else if (typeof arguments[0] === 'object') {
      options = _.extend(options, { body: body });
    }

    return this.client.request(options, callback);
  };
}

function getResource(path) {
  var proxy = Heroku,
      segments;

  path = path.split(/\//);
  segments = path.slice(1, path.length);

  segments.forEach(function (segment) {
    var constructor;

    if (proxy.prototype && proxy.prototype[segment]) {
      return proxy = proxy.prototype[segment]._constructor;
    }

    if (!segment.match(/{.*}/)) {
      constructor = function (client, params) {
        this.client = client;
        this.params = params;
      };

      proxy.prototype[segment] = function (param) {
        var client, params, resource;

        if (this instanceof Heroku) {
          client = this;
        } else {
          client = this.client;
        }

        params = this.params || [];
        if (param) params = params.concat(param);

        return new constructor(client, params);
      };

      proxy.prototype[segment]._constructor = constructor;

      return proxy = constructor;
    }
  });

  return proxy;
}

function getName(name) {
  name = name.toLowerCase();
  name = inflection.dasherize(name).replace(/-/g, '_');
  name = inflection.camelize(name, true);

  return name;
}
