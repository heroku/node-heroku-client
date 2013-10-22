# heroku-client [![Build Status](https://travis-ci.org/heroku/node-heroku-client.png?branch=master)](https://travis-ci.org/heroku/node-heroku-client)

A wrapper around the [v3 Heroku API][platform-api-reference].

## Install

```sh
$ npm install heroku-client --save
```

## Documentation

Docs are auto-generated and live in the [docs directory](https://github.com/heroku/node-heroku-client/tree/development/docs).

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

### Promises

heroku-client works with Node-style callbacks, but also implements promises with the [Q][q] library.

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

## Caching

heroku-client performs caching by creating a memcached client using [memjs][memjs]. See the memjs repo for environment-specific configuration instructions and details.

To tell heroku-client to perform caching, call the `configure` function:

```javascript
var Heroku = require('heroku').configure({ cache: true });
```

This requires a `MEMCACHIER_SERVERS` environment variable, as well as a `HEROKU_CLIENT_ENCRYPTION_SECRET` environment variable that heroku-client uses to build cache keys and encrypt cache contents.

## Contributing

### Updating resources

When a new resource manifest is available, download it into the repo, run tests, generate documentation, and [bump the version number accordingly](http://semver.org/).

### Generating documentation

Documentation for heroku-client is auto-generated from [the resources manifest](https://github.com/heroku/node-heroku-client/blob/development/lib/resources.js).
Docs are generated like so:

```bash
$ bin/docs
```

Generating docs also runs a cursory test, ensuring that every documented function *is* a function that can be called.

### Running tests

heroku-client uses [jasmine-node][jasmine-node] for tests:

```bash
$ npm test
```

[platform-api-reference]: https://devcenter.heroku.com/articles/platform-api-reference
[q]: https://github.com/kriskowal/q
[memjs]: https://github.com/alevy/memjs
[jasmine-node]: https://github.com/mhevery/jasmine-node
