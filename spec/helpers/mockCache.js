'use strict';

module.exports = MockCache;

var encryptor = require('../../lib/encryptor');

function MockCache() {
}

MockCache.prototype.get = function(key, callback) {
  var body = { cachedFoo: "bar" };
  var value = JSON.stringify({ etag: '123', body: body });

  value = encryptor.encrypt(value);
  callback(null, value);
};

MockCache.prototype.set = function() {
  return true;
};
