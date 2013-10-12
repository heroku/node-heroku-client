var Heroku     = require('./heroku'),
    inflection = require('inflection'),
    resources  = require('./schema').definitions,
    _          = require('lodash');


exports.build = function () {
  _.each(resources, function (resource, resourceName) {
    buildResource(resource);
  });
};


function buildResource (resource) {
  _.each(resource.links, buildAction);
}


function buildAction (action) {
  var constructor = getResource(action.href),
      actionName = getActionName(action);

  constructor.prototype[getName(actionName)] = function (body, callback) {
    var requestPath = action.href,
        pathParams  = action.href.match(/{[^}]+}/g) || [],
        callback;

    if (this.params.length !== pathParams.length) {
      throw new Error('Invalid number of params in path (expected ' + pathParams.length + ', got ' + this.params.length + ').');
    }

    this.params.forEach(function (param) {
      requestPath = requestPath.replace(/{[^}]+}/, param);
    });

    var options = {
      method: action.method,
      path: requestPath
    };

    if (typeof arguments[0] === 'function') {
      callback = body;
    } else if (typeof arguments[0] === 'object') {
      options = _.extend(options, { body: body });
    }

    return this.client.request(options, callback);
  };
}


function getActionName(action) {
  var stdNames = ["Info", "List", "Create", "Update", "Delete"];

  if (_.include(stdNames, action.title)) {
    return action.title;
  }

  return action.method[0].toUpperCase() + action.method.slice(1, action.method.length);
}


function getResource(path) {
  var proxy = Heroku,
      segments;

  path = path.split(/\//);
  segments = path.slice(1, path.length);

  segments.forEach(function (segment) {
    var constructor;

    segment = getName(segment);

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
