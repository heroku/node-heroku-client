'use strict';

var url = require('../../lib/url');

describe('url', function() {
  it('parses URL with protocol', function(done) {
    var u = url('https://api.heroku.com');
    expect(u.host).toEqual('api.heroku.com');
    expect(u.port).toEqual(443);
    expect(u.secure).toEqual(true);

    u = url('http://api.heroku.com');
    expect(u.host).toEqual('api.heroku.com');
    expect(u.port).toEqual(80);
    expect(u.secure).toEqual(false);

    done();
  });

  it('parses URL without protocol', function(done) {
    var u = url('api.heroku.com');
    expect(u.host).toEqual('api.heroku.com');
    expect(u.port).toEqual(80);
    expect(u.secure).toEqual(false);

    done();
  });

  it('parses URL with port', function(done) {
    var u = url('api.heroku.com:123');
    expect(u.host).toEqual('api.heroku.com');
    expect(u.port).toEqual(123);
    expect(u.secure).toEqual(false);

    u = url('api.heroku.com:443');
    expect(u.host).toEqual('api.heroku.com');
    expect(u.port).toEqual(443);
    expect(u.secure).toEqual(true);

    done();
  });
});
