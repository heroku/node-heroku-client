'use strict';

module.exports = MockCache;

var encryptor = require('simple-encryptor')(process.env.HEROKU_CLIENT_ENCRYPTION_SECRET);

function MockCache() {}

MockCache.prototype.get = function(key, callback) {
  var body  = { cachedFoo: 'bar' };
  var value = { etag: '123', body: body };

  value = encryptor.encrypt(value);
  callback(null, value);
};

MockCache.prototype.set = function() {
  return true;
};
