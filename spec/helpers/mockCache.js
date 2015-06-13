'use strict';

module.exports = MockCache;

function MockCache(key) {
  this.encryptor = require('simple-encryptor')(key);
}

MockCache.prototype.get = function(key, callback) {
  var body  = { cachedFoo: 'bar' };
  var value = { etag: '123', body: body };

  value = this.encryptor.encrypt(value);
  callback(null, value);
};

MockCache.prototype.set = function() {
  return true;
};
