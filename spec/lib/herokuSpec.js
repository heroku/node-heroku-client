'use strict';

var Heroku  = require('../../lib/heroku');
var Request = require('../../lib/request');
var heroku  = new Heroku({ token: '12345' });

describe('Heroku', function() {
  beforeEach(function() {
    spyOn(Request, 'request').andCallFake(function(options, callback) {
      callback();
    });
  });

  it('can create a client with .createClient', function() {
    heroku = Heroku.createClient({ token: '12345' });
    expect(heroku.constructor.name).toEqual('Heroku');
  });

  it('passes its method into the request', function() {
    heroku.apps().create({}, function() {
      expect(Request.request.mostRecentCall.args[0].method).toEqual('POST');
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
    it('can perform a request with no parameters', function() {
      heroku.apps().list(function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps');
      });
    });

    it('can perform a request with one parameter', function() {
      heroku.apps('my-app').info(function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app');
      });
    });

    it('can perform a request with multiple parameters', function() {
      heroku.apps('my-app').collaborators('jonathan@heroku.com').info(function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/collaborators/jonathan@heroku.com');
      });
    });
  });

  describe('requests with a body and no parameters', function() {
    it('requests the correct path', function() {
      heroku.apps().create({ name: 'my-app' }, function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps');
      });
    });

    it('sends the request body', function() {
      heroku.apps().create({ name: 'my-new-app' }, function() {
        expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'my-new-app' });
      });
    });
  });

  describe('requests with a body and one parameter', function() {
    it('requests the correct path', function() {
      heroku.apps('my-app').addons().create({ name: 'papertrail:choklad' }, function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/addons');
      });
    });

    it('sends the request body', function() {
      heroku.apps('my-app').addons().create({ name: 'papertrail:choklad' }, function() {
        expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'papertrail:choklad' });
      });
    });
  });

  describe('requests with a body and multiple parameters', function() {
    it('requests the correct path', function() {
      heroku.apps('my-app').addons('papertrail:choklad').update({ name: 'papertrail:fixa' }, function() {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app/addons/papertrail:choklad');
      });
    });

    it('sends the request body', function() {
      heroku.apps('my-app').addons('papertrail:choklad').update({ name: 'papertrail:fixa' }, function() {
        expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'papertrail:fixa' });
      });
    });
  });

  describe('#get', function() {
    it('does a GET request', function() {
      heroku.get('/apps', function () {
        expect(Request.request.mostRecentCall.args[0].method).toEqual('GET');
      });
    });

    it('requests the specified path', function() {
      heroku.get('/apps', function () {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps');
      });
    });
  });

  describe('#post', function() {
    it('does a POST request', function() {
      heroku.post('/apps', function () {
        expect(Request.request.mostRecentCall.args[0].method).toEqual('POST');
      });
    });

    it('requests the specified path', function() {
      heroku.post('/apps', function () {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps');
      });
    });

    describe('when a body is supplied', function() {
      it('sends the request body', function() {
        heroku.post('/apps', { name: 'my-app' }, function () {
          expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'my-app' });
        });
      });
    });
  });

  describe('#patch', function() {
    it('does a PATCH request', function() {
      heroku.patch('/apps', function () {
        expect(Request.request.mostRecentCall.args[0].method).toEqual('PATCH');
      });
    });

    it('requests the specified path', function() {
      heroku.patch('/apps', function () {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps');
      });
    });

    describe('when a body is supplied', function() {
      it('sends the request body', function() {
        heroku.patch('/apps', { name: 'my-app' }, function () {
          expect(Request.request.mostRecentCall.args[0].body).toEqual({ name: 'my-app' });
        });
      });
    });
  });

  describe('#delete', function() {
    it('does a DELETE request', function() {
      heroku.delete('/apps/my-app', function () {
        expect(Request.request.mostRecentCall.args[0].method).toEqual('DELETE');
      });
    });

    it('requests the specified path', function() {
      heroku.delete('/apps/my-app', function () {
        expect(Request.request.mostRecentCall.args[0].path).toEqual('/apps/my-app');
      });
    });
  });
});
