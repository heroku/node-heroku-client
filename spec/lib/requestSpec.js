var https        = require("https"),
    request      = require('../../lib/request'),
    MockRequest  = require('../helpers/mockRequest'),
    MockResponse = require('../helpers/mockResponse'),
    requestOptions;

describe('request', function() {
  it('uses the v3 API', function(done) {
    makeRequest('/apps', {}, function() {
      expect(requestOptions.headers['Accept']).toEqual('application/vnd.heroku+json; version=3');
      done();
    });
  });

  it('makes a request to a given path', function(done) {
    makeRequest('/apps', {}, function() {
      expect(requestOptions.path).toEqual("/apps");
      done();
    });
  });

  it('accepts a timeout', function(done) {
    makeRequest('/apps', { timeout: 1 }, function(err, body) {
      expect(err.message).toEqual('Request took longer than 1ms to complete.');
      done();
    }, { timeout: 10 });
  });

  it('writes the request body as a string', function(done) {
    spyOn(MockRequest.prototype, 'write');

    makeRequest('/apps', { body: { foo: 'bar' } }, function() {
      expect(MockRequest.prototype.write).toHaveBeenCalledWith(JSON.stringify({ foo: 'bar' }));
      done();
    });
  });

  describe('callbacks and promises', function() {
    it('sends a successful response to the callback', function(done) {
      makeRequest('/apps', {}, function(err, body) {
        expect(body).toEqual(JSON.parse('{ "message": "ok" }'));
        done()
      });
    });

    it('sends an error to the callback', function(done) {
      makeRequest('/apps', {}, function(err, body) {
        expect(err.message).toEqual('Expected response to be successful, got 404');
        done()
      }, { response: { statusCode: 404 } });
    });

    it('resolves a promise when successful', function(done) {
      makeRequest('/apps', {}).then(function(body) {
        expect(body).toEqual(JSON.parse('{ "message": "ok" }'));
        done()
      });
    });

    it('rejects a promise when there is an error', function(done) {
      makeRequest('/apps', {}, null, { response: { statusCode: 404 } }).fail(function(err) {
        expect(err.message).toEqual('Expected response to be successful, got 404');
        done()
      });
    });
  });

  describe('options', function() {
    it('accepts an auth string', function(done) {
      makeRequest('/apps', { key: 'api-token' }, function() {
        expect(requestOptions.auth).toEqual(':api-token');
        done();
      });
    });

    it('GETs by default', function(done) {
      makeRequest('/apps', {}, function() {
        expect(requestOptions.method).toEqual('GET');
        done();
      });
    });

    it('accepts a method', function(done) {
      makeRequest('/apps', { method: 'POST' }, function() {
        expect(requestOptions.method).toEqual('POST');
        done();
      });
    });

    it('extends the default headers with custom headers', function(done) {
      var expectedHeaders = {
        'Arbitrary': 'header',
        'Accept': 'application/vnd.heroku+json; version=3'
      }

      makeRequest('/apps', { headers: { 'Arbitrary': 'header' } }, function() {
        expect(requestOptions.headers).toEqual(expectedHeaders);
        done();
      });
    });
  });

  describe('status codes', function() {
    it('expects a 200 response by default', function(done) {
      makeRequest('/apps', {}, function(err) {
        expect(err.message).toEqual('Expected response to be successful, got 404');
        done();
      }, { response: { statusCode: 404 } })
    });

    it('accepts a custom expected status', function(done) {
      makeRequest('/apps', { expectedStatus: 201 }, function(err, body) {
        expect(err.message).toEqual('Expected response 201, got 200');
        done();
      });
    });
  });
});

function makeRequest(path, options, callback, testOptions) {
  testOptions || (testOptions = {});

  spyOn(https, "request").andCallFake(function(options, httpsCallback) {
    var req = new MockRequest();
    var res = new MockResponse(testOptions.response || {});

    httpsCallback(res);

    setTimeout(function() {
      res.emit('data', '{ "message": "ok" }');
      if (!req.isAborted) res.emit('end');
    }, testOptions.timeout || 0);

    return req;
  });

  return request(path, options, function(err, body) {
    requestOptions = https.request.mostRecentCall.args[0];
    if (callback) callback(err, body);
  });
}
