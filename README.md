# heroku-client [![Build Status](https://travis-ci.org/heroku/node-heroku-client.png?branch=master)](https://travis-ci.org/heroku/node-heroku-client)

A wrapper around the [v3 Heroku API][platform-api-reference].

- [Install](#install)
- [Documentation](#documentation)
- [Usage](#usage)
  - [Generic Requests](#generic-requests)
  - [Promises](#promises)
  - [Generators](#generators)
  - [HTTP Proxies](#http-proxies)
- [Caching](#caching)
  - [Custom caching](#custom-caching)
- [Contributing](#contributing)
  - [Updating resources](#updating-resources)
  - [Generating documentation](#generating-documentation)
  - [Running tests](#running-tests)

## Install

```sh
$ npm install heroku-client --save
```

## Documentation

Docs are auto-generated and live in the
[docs directory](https://github.com/heroku/node-heroku-client/tree/master/docs).

## Usage

`heroku-client` works by providing functions that return proxy objects for
interacting with different resources through the Heroku API.

To begin, require the Heroku module and create a client, passing in an API
token:

```javascript
var Heroku = require('heroku-client'),
    heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
```

The simplest example is listing a user's apps. First, we call `heroku.apps()`,
which returns a proxy object to the /apps endpoint, then we call `list()` to
actually perform the API call:

```javascript
heroku.apps().list(function (err, apps) {
  // `apps` is a parsed JSON response from the API
});
```

The advantage of using proxy objects is that they are reusable. Let's get the
info for the user's app "my-app", get the dynos for the app, and
remove a collaborator:

```javascript
var app = heroku.apps('my-app');

app.info(function (err, app) {
  // Details about the `app`
});

app.dynos().list(function (err, dynos) {
  // List of the app's `dynos`
});

app.collaborators('user@example.com').delete(function (err, collaborator) {
  // The `collaborator` has been removed unless `err`
});
```

Requests that require a body are easy, as well. Let's add a collaborator to
the user's app "another-app":

```javascript
var app  = heroku.apps('another-app'),
    user = { email: 'new-user@example.com' };

app.collaborators().create({ user: user }, function (err, collaborator) {
  // `collaborator` is the newly added collaborator unless `err`
});
```

### Generic Requests

heroku-client has `get`, `post`, `patch`, and `delete` functions which can make
requests with the specified HTTP method to any endpoint:

```javascript
heroku.get('/apps', function (err, apps) {
});

// Request body is optional on both `post` and `patch`
heroku.post('/apps', function (err, app) {
});

heroku.post('/apps', { name: 'my-new-app' }, function (err, app) {
});

heroku.patch('/apps/my-app', { name: 'my-renamed-app' }, function (err, app) {
});

heroku.delete('/apps/my-old-app', function (err, app) {
});
```

There is also an even more generic `request` function that can accept many more
options:

```javascript
heroku.request({
  method: 'GET',
  path: '/apps',
  headers: {
    'Foo': 'Bar'
  },
  parseJSON: false
}, function (err, responseBody) {
});
```

### Promises

heroku-client works with Node-style callbacks, but also implements promises with
the [Q][q] library.

```javascript
var q = require('q');

// Fetches dynos for all of my apps.
heroku.apps().list().then(function (apps) {

  return q.all(apps.map(function (app) {
    return heroku.apps(app.name).dynos().list();
  }));

}).then(function (dynos) {

  console.log(dynos);

});
```

### Generators

It's easy to get heroku-client working with [generators][generators]. In this
example, I'll use the [co][co] library to wrap a function that will get the list
of all of my apps, and then get the dynos for each of those apps:

```javascript
let co     = require('co');
let heroku = require('heroku-client');
let hk     = heroku.createClient({ token: process.env.HEROKU_API_KEY });

let main = function* () {
  let apps  = yield hk.apps().list();
  let dynos = yield apps.map(getDynos);

  console.log(dynos);

  function getDynos(app) {
    return hk.apps(app.name).dynos().list();
  }
};

co(main)();
```

As long as you're using Node >= 0.11, you can run this script with:

```sh
$ node --harmony --use-strict file.js
```

Hooray, no callbacks or promises in sight!

### HTTP Proxies

If you'd like to make requests through an HTTP proxy, set the
`HEROKU_HTTP_PROXY_HOST` environment variable with your proxy host, and
`HEROKU_HTTP_PROXY_PORT` with the desired port (defaults to 8080). heroku-client
will then make requests through this proxy instead of directly to
api.heroku.com.

## Caching

heroku-client can optionally perform caching of API requests.

heroku-client will cache any response from the Heroku API that comes with an
`ETag` header, and each response is cached individually (i.e. even though the
client might make multiple calls for a user's apps and then aggregate them into
a single JSON array, each required API call is individually cached). For each
API request it performs, heroku-client sends an `If-None-Match` header if there
is a cached response for the API request. If API returns a 304 response code,
heroku-client returns the cached response. Otherwise, it writes the new API
response to the cache and returns that.

To tell heroku-client to perform caching, add a config object to the options
with store and encryptor objects. These can be instances of memjs and
simple-encryptor, respectively.

```js
var Heroku    = require('heroku-client');
var memjs     = require('memjs').Client.create();
var encryptor = require('simple-encryptor')(SECRET_CACHE_KEY);
var hk        = new Heroku({
  cache: { store: memjs, encryptor: encryptor }
});
```

### Custom caching

Alternatively you can specify a custom cache implementation. Your custom implementation must define `get(key, cb(err, value))` and `set(key, value)` functions.

Here's a sample implementation that uses Redis to cache API responses for 5-minutes each:

```javascript
var redis        = require('redis');
var client       = redis.createClient();
var cacheTtlSecs = 5 * 60; // 5 minutes

var redisStore = {
  get: function(key, cb) {
    // Namespace the keys:
    var redisKey = 'heroku:api:' + key;
    client.GET(redisKey, cb);
  },

  set: function(key, value) {
    // Namespace the keys:
    var redisKey = 'heroku:api:' + key;
    client.SETEX(redisKey, cacheTtlSecs, value, function(err) {
      // ignore errors on set
    });
  }
};

var encryptor = require('simple-encryptor')(SECRET_CACHE_KEY);
var Heroku    = require('heroku-client');
var hk        = new Heroku({
  cache: {store: redisStore, encryptor: encryptor}
});
```

## Contributing

### Updating resources

To fetch the latest schema, generate documentation, and run the tests:

```sh
$ bin/update
```

Inspect your changes, and
[bump the version number accordingly](http://semver.org/) when cutting a
release.

### Generating documentation

Documentation for heroku-client is auto-generated from
[the API schema](https://github.com/heroku/node-heroku-client/blob/master/lib/schema.js).

Docs are generated like so:

```bash
$ bin/docs
```

Generating docs also runs a cursory test, ensuring that every documented
function *is* a function that can be called.

### Running tests

heroku-client uses [jasmine-node][jasmine-node] for tests:

```bash
$ npm test
```

[platform-api-reference]: https://devcenter.heroku.com/articles/platform-api-reference
[q]: https://github.com/kriskowal/q
[memjs]: https://github.com/alevy/memjs
[bin_secret]: https://github.com/heroku/node-heroku-client/blob/master/bin/secret
[memcachier]: https://www.memcachier.com
[jasmine-node]: https://github.com/mhevery/jasmine-node
[generators]: https://github.com/JustinDrake/node-es6-examples#generators
[co]: https://github.com/visionmedia/co
