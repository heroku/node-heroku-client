var EventEmitter = require("events").EventEmitter;

module.exports = MockResponse;

function MockResponse(options) {
  this.statusCode = 200;
  this.headers = {};

  for (var key in options) {
    this[key] = options[key];
  }
}

for (var key in EventEmitter.prototype) {
  MockResponse.prototype[key] = EventEmitter.prototype[key];
}
