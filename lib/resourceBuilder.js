'use strict';

var Heroku     = require('./heroku');
var inflection = require('inflection');
var pathProxy  = require('path-proxy');
var resources  = require('./schema').definitions;


exports.build = function () {
  for (var key in resources) {
    if (resources.hasOwnProperty(key)) {
      buildResource(resources[key]);
    }
  }
};


function buildResource(resource) {
  resource.links.forEach(buildAction);
}


function buildAction(action) {
  var constructor = pathProxy.pathProxy(Heroku, action.href);
  var actionName  = action.title;

  constructor.prototype[getName(actionName)] = function (body, callback) {
    var requestPath = action.href;
    var pathParams  = action.href.match(/{[^}]+}/g) || [];

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

    this.client = this.base;
    return this.client.request(options, callback);
  };
}


function getName(name) {
  name = name.toLowerCase();
  name = inflection.dasherize(name).replace(/-/g, '_');
  name = inflection.camelize(name, true);

  return name;
}
