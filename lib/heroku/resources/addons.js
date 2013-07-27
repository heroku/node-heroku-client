var _ = require ('underscore');

module.exports = addons;

function addons(id, options, callback) {
  var defaultOptions = {
    headers: { 'Accept': 'application/vnd.heroku+json; version=2' }
  }

  if (typeof id === 'string') {

    if (typeof options === 'object') {
      options = _.extend(defaultOptions, options);
    } else {
      callback = options;
      options = defaultOptions;
    }

    return this.request('/addons/' + id, options, callback);

  } else {

    if (typeof id === 'object') {
      callback = options;
      options = _.extend(defaultOptions, id);
    } else {
      callback = id;
      options = defaultOptions;
    }

    return this.request('/addons', options, callback);

  }
};
