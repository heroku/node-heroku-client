'use strict';

var Stream = require('stream').Stream;

module.exports = MockResponse;

function MockResponse(options) {
  this.statusCode = 200;
  this.headers = {};

  for (var key in options) {
    this[key] = options[key];
  }
}

for (var key in Stream.prototype) {
  MockResponse.prototype[key] = Stream.prototype[key];
}
