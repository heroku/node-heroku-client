var Heroku  = require('../../lib/heroku'),
    Request = require('../../lib/request'),
    heroku  = new Heroku({ token: '12345' });

describe('Heroku', function() {
  beforeEach(function() {
    spyOn(Request, 'request').andCallFake(function(options, callback) {
      callback();
    });
  });

  it('passes its method into the request', function(done) {
    heroku.apps().create({}, function() {
      expect(Request.request.mostRecentCall.args[0].method).toEqual('POST');
      done();
    });
  });

  describe('requests with the wrong number of parameters', function() {
    it('throws an error', function() {
      expect(function () {
        heroku.apps('my-app').list();
      }).toThrow(new Error('Invalid number of params in path (expected 0, got 1).'));
    });
  });

  describe('requests with no body', function() {
    it('can perform a request with no parameters', function(done) {
      heroku.apps().list(function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps');
        done();
      });
    });

    it('can perform a request with one parameter', function(done) {
      heroku.apps('my-app').info(function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app');
        done();
      });
    });

    it('can perform a request with multiple parameters', function(done) {
      heroku.apps('my-app').collaborators('jonathan@heroku.com').info(function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/collaborators/jonathan@heroku.com');
        done();
      });
    });
  });

  describe('requests with a body and no parameters', function() {
    it('requests the correct path', function(done) {
      heroku.apps().create({ name: 'my-app' }, function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps');
        done();
      });
    });

    it('sends the request body', function(done) {
      heroku.apps().create({ name: 'my-new-app' }, function() {
        expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'my-new-app' });
        done();
      });
    });
  });

  describe('requests with a body and one parameter', function() {
    it('requests the correct path', function(done) {
      heroku.apps('my-app').addons().create({ name: 'papertrail:choklad' }, function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/addons');
        done();
      });
    });

    it('sends the request body', function(done) {
      heroku.apps('my-app').addons().create({ name: 'papertrail:choklad' }, function() {
        expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'papertrail:choklad' });
        done();
      });
    });
  });

  describe('requests with a body and multiple parameters', function() {
    it('requests the correct path', function(done) {
      heroku.apps('my-app').addons('papertrail:choklad').update({ name: 'papertrail:fixa' }, function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/addons/papertrail:choklad');
        done();
      });
    });

    it('sends the request body', function(done) {
      heroku.apps('my-app').addons('papertrail:choklad').update({ name: 'papertrail:fixa' }, function() {
        expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'papertrail:fixa' });
        done();
      });
    });
  });
});
