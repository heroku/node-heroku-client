'use strict'

const test = require('ava')
const Heroku = require('.')
const heroku = new Heroku()
const nock = require('nock')
const stdMock = require('stdout-stderr')

test.before(() => {
  nock.disableNetConnect()
})

test('get /apps', t => {
  const api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(200, [{ name: 'myapp' }])

  return heroku.get('/apps')
    .then(apps => {
      t.is(apps[0].name, 'myapp')
    })
    .then(() => api.done())
})

test('post /apps', t => {
  const api = nock('https://api.heroku.com')
    .post('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.post('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      t.deepEqual(apps, {})
    })
    .then(() => api.done())
})

test('delete /apps', t => {
  const api = nock('https://api.heroku.com')
    .delete('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.delete('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      t.deepEqual(apps, {})
    })
    .then(() => api.done())
})

test('patch /apps', t => {
  const api = nock('https://api.heroku.com')
    .patch('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.patch('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      t.deepEqual(apps, {})
    })
    .then(() => api.done())
})

test('put /apps', t => {
  const api = nock('https://api.heroku.com')
    .put('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.put('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      t.deepEqual(apps, {})
    })
    .then(() => api.done())
})

test('non-http', t => {
  const api = nock('http://api.heroku.com')
    .get('/apps')
    .reply(200, [{ name: 'myapp' }])

  return heroku.get('/apps', { host: 'http://api.heroku.com' })
    .then(apps => {
      t.is(apps[0].name, 'myapp')
    })
    .then(() => api.done())
})

test('url: https', t => {
  const url = require('./lib/url')
  t.true(url('https://api.heroku.com').secure)
  t.true(url('api.heroku.com').secure)
})

test('url: http', t => {
  const url = require('./lib/url')
  t.false(url('http://api.heroku.com').secure)
})

test('request does not produce any stderr', async t => {
  // this relates to leaky node deprecation warnings hitting
  // the console

  stdMock.stderr.start()

  const api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(200, [])

  await heroku.get('/apps')

  api.done()
  stdMock.stderr.stop()

  t.is(stdMock.stderr.output, '', 'no stderr errors from running the client')
})
