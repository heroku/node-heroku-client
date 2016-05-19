'use strict'

const ava = require('ava')
const test = ava.test
const Heroku = require('.')
const heroku = new Heroku()
const nock = require('nock')

test.before(() => {
  nock.disableNetConnect()
})

test('get /apps', t => {
  let api = nock('https://api.heroku.com')
  .get('/apps')
  .reply(200, [{name: 'myapp'}])

  return heroku.get('/apps')
  .then(apps => {
    t.is(apps[0].name, 'myapp')
  })
  .then(() => api.done())
})

test('post /apps', t => {
  let api = nock('https://api.heroku.com')
  .post('/apps', {name: 'myapp'})
  .reply(201)

  return heroku.post('/apps', {body: {name: 'myapp'}})
  .then(() => api.done())
})

test('delete /apps', t => {
  let api = nock('https://api.heroku.com')
  .delete('/apps', {name: 'myapp'})
  .reply(201)

  return heroku.delete('/apps', {body: {name: 'myapp'}})
  .then(() => api.done())
})

test('patch /apps', t => {
  let api = nock('https://api.heroku.com')
  .patch('/apps', {name: 'myapp'})
  .reply(201)

  return heroku.patch('/apps', {body: {name: 'myapp'}})
  .then(() => api.done())
})

test('put /apps', t => {
  let api = nock('https://api.heroku.com')
  .put('/apps', {name: 'myapp'})
  .reply(201)

  return heroku.put('/apps', {body: {name: 'myapp'}})
  .then(() => api.done())
})

test('non-http', t => {
  let api = nock('http://api.heroku.com')
  .get('/apps')
  .reply(200, [{name: 'myapp'}])

  return heroku.get('/apps', {host: 'http://api.heroku.com'})
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
