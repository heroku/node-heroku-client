var _ = require ('underscore');

module.exports = apps;

function apps(id, options, callback) {
  if (typeof id === 'string') {
    return this.request('/apps/' + id, options, callback);
  } else {
    return this.request('/apps', id, options);
  }
};

apps.ps = function ps(id, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = _.extend({
    headers: { 'Accept': 'application/vnd.heroku+json; version=2' }
  }, options);

  return this.request('/apps/' + id + '/ps', options, callback);
};

apps.collaborators = function collaborators(id, options, callback) {
  return this.request('/apps/' + id + '/collaborators', options, callback);
};

apps.addons = function addons(appId, addonId, options, callback) {
  if (typeof addonId === 'string') {
    return this.request('/apps/' + appId + '/addons/' + addonId, options, callback);
  } else {
    return this.request('/apps/' + appId + '/addons', addonId, options);
  }
};
