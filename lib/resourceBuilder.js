var Heroku     = require('./heroku'),
    inflection = require('inflection'),
    resources  = require('./schema').definitions;


exports.build = function () {
  for (var key in resources) {
    buildResource(resources[key]);
  }
};


function buildResource (resource) {
  resource.links.forEach(buildAction);
}


function buildAction (action) {
  var constructor = getResource(action.href),
      actionName = action.title;

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
      options.body = body;
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
        var client, params;

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
