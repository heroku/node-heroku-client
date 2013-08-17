# heroku-client [![Build Status](https://travis-ci.org/jclem/node-heroku-client.png?branch=master)](https://travis-ci.org/jclem/node-heroku-client)

A wrapper around the [v3 Heroku API][platform-api-reference].

## Usage

```javascript
// Create a new client and give it an API token
var Heroku = require('heroku-client')
  , heroku = new Heroku({ token: user.apiToken });

heroku.apps().list(function (err, apps) {
  console.log(apps);
});

heroku.apps('my-app').info(function (err, app) {
  console.log(app);
});

heroku.apps().create({ name: 'my-new-app' }, function (err, app) {
  console.log(app);
});

var newPlan = { plan: { name: 'papertrail:fixa' } };
heroku.apps('my-app').addons('papertrail').update(newPlan, function (err, addon) {
  console.log(addon);
});
```

### Promises

heroku-client works with Node-style callbacks, but also implements promises with the [q][q] library.

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
