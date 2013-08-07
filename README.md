# node-heroku [![Build Status](https://travis-ci.org/jclem/node-heroku.png?branch=development)](https://travis-ci.org/jclem/node-heroku)

A wrapper around the [v3 Heroku API][platform-api-reference].

## Usage

```javascript
/* Create a new client and give it an API token
 * as well as a cache key postfix.
 */
var Heroku = require('heroku').Heroku;
heroku = new Heroku({ token: user.apiToken });

heroku.app.list(function (err, apps) {
  console.log(apps);
});

heroku.app.info('my-app', function (err, app) {
  console.log(app);
});

heroku.app.create({ name: 'my-new-app' }, function (err, app) {
  console.log(app);
});

heroku.addOn.update('my-app', 'papertrail', { plan: { name: 'papertrail:fixa' } }, function (err, addOn) {
  console.log(addOn);
});
```

### Promises

node-heroku works with Node-style callbacks, but also implements promises with the [q][q] library.

```javascript
var q = require('q');

// Fetches dynos for all of my apps.
heroku.app.list().then(function (apps) {

  return q.all(apps.map(function (app) {
    return heroku.dyno.list(app.name);
  }));

}).then(function (dynos) {

  console.log(dynos);

});
```

## Caching

When `NODE_ENV` is set to "production", node-heroku will create a memcached client using [memjs][memjs]. See the memjs repo for configuration instructions.

For local development with caching, it's enough to start a memcached server and set `MEMCACHIER_SERVERS` to `0.0.0.0:11211` in your `.env` file.

You will also need to pass an option called `cacheKeyPostfix` when creating your node-heroku client:

```javascript
var heroku = new Heroku({ token: user.apiToken, cacheKeyPostfix: user.id });
```

This ensures that API responses are cached and properly scoped to the user that node-heroku is making requests on behalf of.

## Contributing

### Running tests

node-heroku uses [jasmine-node][jasmine-node] for tests:

```javascript
$ npm test
```

[platform-api-reference]: https://devcenter.heroku.com/articles/platform-api-reference
[q]: https://github.com/kriskowal/q
[memjs]: https://github.com/alevy/memjs
[jasmien-node]: https://github.com/mhevery/jasmine-node
