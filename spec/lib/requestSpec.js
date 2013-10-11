var https        = require("https"),
    Request      = require('../../lib/request'),
    memjs        = require('memjs'),
    MockCache    = require('../helpers/mockCache'),
    MockRequest  = require('../helpers/mockRequest'),
    MockResponse = require('../helpers/mockResponse');

describe('request', function() {
  it('uses the v3 API', function(done) {
    makeRequest('/apps', {}, function() {
      expect(https.request.mostRecentCall.args[0].headers['Accept']).toEqual('application/vnd.heroku+json; version=3');
      done();
    });
  });

  it('makes a request to a given path', function(done) {
    makeRequest('/apps', {}, function() {
      expect(https.request.mostRecentCall.args[0].path).toEqual("/apps");
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

  it('sets the Content-length when a body is present', function(done) {
    spyOn(MockRequest.prototype, 'setHeader');

    makeRequest('/apps', { body: { foo: 'bar' } }, function() {
      expect(MockRequest.prototype.setHeader).toHaveBeenCalledWith('Content-length', JSON.stringify({ foo: 'bar' }).length);
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
        expect(body).toEqual({ "message": "ok" });
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
    it('uses an auth string', function(done) {
      makeRequest('/apps', { token: 'api-token' }, function() {
        expect(https.request.mostRecentCall.args[0].auth).toEqual(':api-token');
        done();
      });
    });

    it('GETs by default', function(done) {
      makeRequest('/apps', {}, function() {
        expect(https.request.mostRecentCall.args[0].method).toEqual('GET');
        done();
      });
    });

    it('accepts a method', function(done) {
      makeRequest('/apps', { method: 'POST' }, function() {
        expect(https.request.mostRecentCall.args[0].method).toEqual('POST');
        done();
      });
    });

    it('extends the default headers with custom headers', function(done) {
      var expectedHeaders = {
        'Arbitrary': 'header',
        'Accept': 'application/vnd.heroku+json; version=3',
        'Content-type': 'application/json',
        'Range': 'id ]..; max=1000'
      }

      makeRequest('/apps', { headers: { 'Arbitrary': 'header' } }, function() {
        expect(https.request.mostRecentCall.args[0].headers).toEqual(expectedHeaders);
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

    it('accepts a single expected status code', function(done) {
      makeRequest('/apps', { expectedStatus: 201 }, function(err, body) {
        expect(err.message).toEqual('Expected response 201, got 200');
        done();
      });
    });

    it('accepts an array of expected status codes (failure)', function(done) {
      makeRequest('/apps', { expectedStatus: [201, 204] }, function(err, body) {
        expect(err.message).toEqual('Expected response [201,204], got 200');
        done();
      }, { response: { statusCode: 200 } });
    });

    it('accepts an array of expected status codes (success, first)', function(done) {
      makeRequest('/apps', { expectedStatus: [201, 204] }, function(err, body) {
        expect(err).toEqual(null);
        done();
      }, { response: { statusCode: 201 } });
    });

    it('accepts an array of expected status codes (success, last)', function(done) {
      makeRequest('/apps', { expectedStatus: [201, 204] }, function(err, body) {
        expect(err).toEqual(null);
        done();
      }, { response: { statusCode: 204 } });
    });
  });

  describe('handling Range headers', function() {
    it('sends a default Range header', function() {
      makeRequest('/apps', {}, function (err, body) {
        expect(https.request.mostRecentCall.args[0].headers['Range']).toEqual('id ]..; max=1000');
      });
    });

    describe('when receiving a Next-Range header', function() {
      it('sends the Next-Range header on the next request', function(done) {
        makeRequest('/apps', {}, function (err, body) {
          expect(https.request.mostRecentCall.args[0].headers['Range']).toEqual('id abcdefg..; max=1000');
          done();
        }, { response: { headers: { 'next-range': 'id abcdefg..; max=1000' } } });
      });

      it('aggregates response bodies', function(done) {
        makeRequest('/apps', {}, function (err, body) {
          expect(body).toEqual([{ message: 'ok' }, { message: 'ok' }]);
          done();
        }, { returnArray: true, response: { headers: { 'next-range': 'id abcdefg..; max=1000' } } });
      });
    });
  });

  describe('caching', function() {
    var cache = new MockCache();

    beforeEach(function() {
      spyOn(memjs.Client, 'create').andReturn(cache);
      Request.connectCacheClient();
    });

    it('sends an etag from the cache', function(done) {
      makeRequest('/apps', {}, function(err, body) {
        expect(https.request.mostRecentCall.args[0].headers['If-None-Match']).toEqual('123');
        done();
      }, { response: { statusCode: 304 } });
    });

    it('gets with a postfix', function(done) {
      spyOn(cache, 'get').andCallThrough();

      makeRequest('/apps', { cacheKeyPostfix: '123' }, function(err, body) {
        expect(cache.get).toHaveBeenCalledWith('/apps-id ]..; max=1000-123', jasmine.any(Function));
        done();
      });
    });

    it('returns a cached body', function(done) {
      makeRequest('/apps', {}, function(err, body) {
        expect(body).toEqual({ cachedFoo: 'bar' });
        done();
      }, { response: { statusCode: 304 } });
    });

    it('writes to the cache when necessary', function(done) {
      spyOn(cache, 'set');

      makeRequest('/apps', { cacheKeyPostfix: '123' }, function(err, body) {
        var expectedCache = JSON.stringify({
          body: { message: 'ok' },
          etag: '123'
        });

        expect(cache.set).toHaveBeenCalledWith('/apps-id ]..; max=1000-123', expectedCache);
        done();
      }, { response: { headers: { etag: '123' } } });
    });
  });
});

function makeRequest(path, options, callback, testOptions) {
  testOptions || (testOptions = {});
  options.path = path;

  spyOn(https, 'request').andCallFake(function (options, httpsCallback) {
    if (options.headers.Range !== 'id ]..; max=1000') {
      testOptions.response.headers['next-range'] = undefined;
    }

    var req = new MockRequest(),
        res = new MockResponse(testOptions.response || {});

    httpsCallback(res);

    setTimeout(function () {
      if (testOptions.returnArray) {
        res.emit('data', '[{ "message": "ok" }]');
      } else {
        res.emit('data', '{ "message": "ok" }');
      }

      if (!req.isAborted) res.emit('end');
    }, testOptions.timeout || 0);

    return req;
  });


  return Request.request(options, function (err, body) {
    if (callback) callback(err, body);
  });
};
