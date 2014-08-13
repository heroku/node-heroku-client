'use strict';

var EventEmitter = require('events').EventEmitter;

module.exports = MockRequest;

function MockRequest() {}

for (var key in EventEmitter.prototype) {
  if (EventEmitter.prototype.hasOwnProperty(key)) {
    MockRequest.prototype[key] = EventEmitter.prototype[key];
  }
}

MockRequest.prototype.write = function(body) {
  this.body = body;
};

MockRequest.prototype.setTimeout = function(timeout, callback) {
  setTimeout(callback, timeout);
};

MockRequest.prototype.setHeader = function() {
};

MockRequest.prototype.abort = function() {
  this.isAborted = true;
};

MockRequest.prototype.end = function() {
};
