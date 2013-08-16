module.exports = MockCache;

function MockCache() {
}

MockCache.prototype.get = function(key, callback) {
  var body = { cachedFoo: "bar" };
  callback(null, JSON.stringify({ etag: '123', body: body }));
};

MockCache.prototype.set = function(key, body) {
  return true;
};
