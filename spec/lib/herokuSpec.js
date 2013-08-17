var Heroku = require('../../lib/heroku'),
    heroku = new Heroku({ token: '12345' });

describe('Heroku', function() {
  beforeEach(function() {
    spyOn(Heroku, 'request').andCallFake(function(options, callback) {
      callback();
    });
  });

  it('passes its method into the request', function(done) {
    heroku.apps('my-app').create({}, function() {
      expect(Heroku.request.mostRecentCall.args[0].method).toEqual('POST');
      done();
    });
  });

  it('passes its expected status into the request', function(done) {
    heroku.apps('my-app').dynos().list(function() {
      expect(Heroku.request.mostRecentCall.args[0].expectedStatus).toEqual([200, 206]);
      done();
    });
  });

  describe('requests with no body', function() {
    it('can perform a request with no parameters', function(done) {
      heroku.apps().list(function() {
        expect(Heroku.request.mostRecentCall.args[0].path).toEqual('/apps');
        done();
      });
    });

    it('can perform a request with one parameter', function(done) {
      heroku.apps('my-app').info(function() {
        expect(Heroku.request.mostRecentCall.args[0].path).toEqual('/apps/my-app');
        done();
      });
    });

    it('can perform a request with multiple parameters', function(done) {
      heroku.apps('my-app').collaborators('jonathan@heroku.com').info(function() {
        expect(Heroku.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/collaborators/jonathan@heroku.com');
        done();
      });
    });
  });

  describe('requests with a body and no parameters', function() {
    it('requests the correct path', function(done) {
      heroku.apps().create({ name: 'my-app' }, function() {
        expect(Heroku.request.mostRecentCall.args[0].path).toEqual('/apps');
        done();
      });
    });

    it('sends the request body', function(done) {
      heroku.apps().create({ name: 'my-new-app' }, function() {
        expect(Heroku.request.mostRecentCall.args[0].body).toEqual({ name: 'my-new-app' });
        done();
      });
    });
  });

  describe('requests with a body and one parameter', function() {
    it('requests the correct path', function(done) {
      heroku.apps('my-app').addons().create({ name: 'papertrail:choklad' }, function() {
        expect(Heroku.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/addons');
        done();
      });
    });

    it('sends the request body', function(done) {
      heroku.apps('my-app').addons().create({ name: 'papertrail:choklad' }, function() {
        expect(Heroku.request.mostRecentCall.args[0].body).toEqual({ name: 'papertrail:choklad' });
        done();
      });
    });
  });

  describe('requests with a body and multiple parameters', function() {
    it('requests the correct path', function(done) {
      heroku.apps('my-app').addons('papertrail:choklad').update({ name: 'papertrail:fixa' }, function() {
        expect(Heroku.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/addons/papertrail:choklad');
        done();
      });
    });

    it('sends the request body', function(done) {
      heroku.apps('my-app').addons('papertrail:choklad').update({ name: 'papertrail:fixa' }, function() {
        expect(Heroku.request.mostRecentCall.args[0].body).toEqual({ name: 'papertrail:fixa' });
        done();
      });
    });
  });
});
