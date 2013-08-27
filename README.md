# heroku-client [![Build Status](https://travis-ci.org/jclem/node-heroku-client.png?branch=master)](https://travis-ci.org/jclem/node-heroku-client)

A wrapper around the [v3 Heroku API][platform-api-reference].

## Install

```sh
$ npm install heroku-client --save
```

## Usage

```javascript
/*
 * `heroku-client` works by providing functions that return proxy objects for
 * interacting with different resources through the Heroku API.
 * 
 * To begin, require the Heroku module and create a client, passing in an API
 * token:
 */
var Heroku = require('heroku-client'),
    heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });


/*
 * The simplest example is listing a user's apps. First, we call `heroku.apps()`,
 * which returns a proxy object to the /apps endpoint, then we call `list()` to
 * actually perform the API call:
 */
heroku.apps().list(function (err, apps) {
  // `apps` is a parsed JSON response from the API
});


/*
 * The advantage of using proxy objects is that they are reusable. Let's get the
 * info for the user's app "my-app", then get the dynos for the app, then
 * remove a collaborator:
 */
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


/*
 * Requests that require a body are easy, as well. Let's add a collaborator to
 * the user's app "another-app":
 */
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

When `NODE_ENV` is set to "production", heroku-client will create a memcached client using [memjs][memjs]. See the memjs repo for configuration instructions.

For local development with caching, it's enough to start a memcached server and set `MEMCACHIER_SERVERS` to `0.0.0.0:11211` in your `.env` file.

You will also need to pass an option called `cacheKeyPostfix` when creating your heroku-client client:

```javascript
var heroku = new Heroku({ token: user.apiToken, cacheKeyPostfix: user.id });
```

This ensures that API responses are cached and properly scoped to the user that heroku-client is making requests on behalf of.

## Contributing

### Running tests

node-heroku uses [jasmine-node][jasmine-node] for tests:

```javascript
$ npm test
```

[platform-api-reference]: https://devcenter.heroku.com/articles/platform-api-reference
[q]: https://github.com/kriskowal/q
[memjs]: https://github.com/alevy/memjs
[jasmine-node]: https://github.com/mhevery/jasmine-node
