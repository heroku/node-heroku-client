'use strict'

const ava = require('ava')
const test = ava.test
const Heroku = require('../')
const nock = require('nock')

test.before(() => {
  nock.disableNetConnect()
})

test.afterEach(() => {
  nock.cleanAll()
})

// Test constructor options
test('constructor with options', t => {
  const heroku = new Heroku({
    token: 'test-token',
    headers: { 'X-Custom': 'value' }
  })
  
  t.truthy(heroku.options)
  t.is(heroku.options.token, 'test-token')
  t.deepEqual(heroku.options.headers, { 'X-Custom': 'value' })
})

test('constructor without options', t => {
  const heroku = new Heroku()
  t.deepEqual(heroku.options, {})
})

// Test authentication
test('authentication with token', t => {
  const heroku = new Heroku({ token: 'test-token' })
  
  let api = nock('https://api.heroku.com')
    .get('/account')
    .matchHeader('authorization', 'Basic OnRlc3QtdG9rZW4=')
    .reply(200, { email: 'test@example.com' })

  return heroku.get('/account')
    .then(account => {
      t.is(account.email, 'test@example.com')
      api.done()
    })
})

test('authentication with auth string', t => {
  const heroku = new Heroku({ auth: 'user:pass' })
  
  let api = nock('https://api.heroku.com')
    .get('/account')
    .matchHeader('authorization', 'Basic dXNlcjpwYXNz')
    .reply(200, { email: 'test@example.com' })

  return heroku.get('/account')
    .then(account => {
      t.is(account.email, 'test@example.com')
      api.done()
    })
})

// Test error handling
test('handles 401 unauthorized', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(401, { id: 'unauthorized', message: 'Unauthorized' })

  return heroku.get('/apps')
    .then(() => {
      t.fail('Should have thrown an error')
    })
    .catch(error => {
      t.is(error.statusCode, 401)
      t.deepEqual(error.body, { id: 'unauthorized', message: 'Unauthorized' })
      api.done()
    })
})

test('handles 404 not found', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps/nonexistent')
    .reply(404, { id: 'not_found', message: 'Not found' })

  return heroku.get('/apps/nonexistent')
    .then(() => {
      t.fail('Should have thrown an error')
    })
    .catch(error => {
      t.is(error.statusCode, 404)
      t.deepEqual(error.body, { id: 'not_found', message: 'Not found' })
      api.done()
    })
})

test('handles 422 validation errors', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .post('/apps')
    .reply(422, { 
      id: 'validation_failed', 
      message: 'Validation failed',
      errors: [{ field: 'name', code: 'invalid' }]
    })

  return heroku.post('/apps', { body: { name: '' } })
    .then(() => {
      t.fail('Should have thrown an error')
    })
    .catch(error => {
      t.is(error.statusCode, 422)
      t.is(error.body.id, 'validation_failed')
      t.truthy(error.body.errors)
      api.done()
    })
})

test('handles 500 server error', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(500, 'Internal Server Error')

  return heroku.get('/apps')
    .then(() => {
      t.fail('Should have thrown an error')
    })
    .catch(error => {
      t.is(error.statusCode, 500)
      api.done()
    })
})

// Test custom headers
test('custom headers are sent', t => {
  const heroku = new Heroku({
    headers: { 'X-Custom-Header': 'custom-value' }
  })
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .matchHeader('X-Custom-Header', 'custom-value')
    .reply(200, [])

  return heroku.get('/apps')
    .then(() => api.done())
})

test('request-level headers override instance headers', t => {
  const heroku = new Heroku({
    headers: { 'X-Custom': 'instance-value' }
  })
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .matchHeader('X-Custom', 'request-value')
    .reply(200, [])

  return heroku.get('/apps', {
    headers: { 'X-Custom': 'request-value' }
  }).then(() => api.done())
})

// Test different hosts
test('custom host', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.staging.heroku.com')
    .get('/apps')
    .reply(200, [{ name: 'staging-app' }])

  return heroku.get('/apps', { host: 'https://api.staging.heroku.com' })
    .then(apps => {
      t.is(apps[0].name, 'staging-app')
      api.done()
    })
})

// Test request body handling
test('post with JSON body', t => {
  const heroku = new Heroku()
  const appData = { name: 'test-app', stack: 'heroku-20' }
  
  let api = nock('https://api.heroku.com')
    .post('/apps', appData)
    .reply(201, Object.assign({}, appData, { id: 'app-id' }))

  return heroku.post('/apps', { body: appData })
    .then(app => {
      t.is(app.name, 'test-app')
      t.is(app.id, 'app-id')
      api.done()
    })
})

test('put with body', t => {
  const heroku = new Heroku()
  const updateData = { maintenance: true }
  
  let api = nock('https://api.heroku.com')
    .put('/apps/test-app', updateData)
    .reply(200, { name: 'test-app', maintenance: true })

  return heroku.put('/apps/test-app', { body: updateData })
    .then(app => {
      t.is(app.maintenance, true)
      api.done()
    })
})

// Test pagination handling
test('handles pagination automatically', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .matchHeader('Range', 'id ..; max=1000')
    .reply(206, [{ name: 'app1' }], { 'Next-Range': 'id app1..; max=1000' })
    .get('/apps')
    .matchHeader('Range', 'id app1..; max=1000')
    .reply(200, [{ name: 'app2' }])

  return heroku.get('/apps')
    .then(apps => {
      t.is(apps.length, 2)
      t.is(apps[0].name, 'app1')
      t.is(apps[1].name, 'app2')
      api.done()
    })
})

test('partial requests do not auto-paginate', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(206, [{ name: 'app1' }], { 'Next-Range': 'id app1..; max=1000' })

  return heroku.get('/apps', { partial: true })
    .then(apps => {
      t.is(apps.length, 1)
      t.is(apps[0].name, 'app1')
      api.done()
    })
})

// Test user agent
test('sets correct user agent', t => {
  const heroku = new Heroku()
  const pjson = require('../package.json')
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .matchHeader('User-Agent', `node-heroku-client/${pjson.version}`)
    .reply(200, [])

  return heroku.get('/apps')
    .then(() => api.done())
})

test('custom user agent', t => {
  const heroku = new Heroku({ userAgent: 'custom-client/1.0.0' })
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .matchHeader('User-Agent', 'custom-client/1.0.0')
    .reply(200, [])

  return heroku.get('/apps')
    .then(() => api.done())
})

// Test parseJSON option
test('parseJSON: false returns raw response', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(200, '[{"name":"test-app"}]')

  return heroku.get('/apps', { parseJSON: false })
    .then(response => {
      t.is(typeof response, 'string')
      t.is(response, '[{"name":"test-app"}]')
      api.done()
    })
})

// Test timeout handling
test('request timeout', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .delay(2000)
    .reply(200, [])

  return heroku.get('/apps', { timeout: 1000 })
    .then(() => {
      t.fail('Should have timed out')
    })
    .catch(error => {
      t.regex(error.message, /Request took longer than 1000ms/)
      // Clean up the delayed request
      nock.cleanAll()
    })
})

// Test retry logic with network errors
test('retries on network errors', t => {
  const heroku = new Heroku()
  
  // Simplified test - just verify it eventually succeeds after an error
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .replyWithError({ code: 'ECONNRESET' })
    .get('/apps')
    .reply(200, [{ name: 'success-app' }])

  return heroku.get('/apps')
    .then(apps => {
      t.is(apps[0].name, 'success-app')
      api.done()
    })
})

// Test JSON parsing edge cases
test('handles empty response body', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .delete('/apps/test-app')
    .reply(200, '')

  return heroku.delete('/apps/test-app')
    .then(response => {
      t.deepEqual(response, {})
      api.done()
    })
})

test('handles malformed JSON in error response', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(500, 'not json')

  return heroku.get('/apps')
    .then(() => {
      t.fail('Should have thrown an error')
    })
    .catch(error => {
      t.is(error.statusCode, 500)
      t.is(error.body, 'not json')
      api.done()
    })
})

// Test middleware functionality
test('middleware is called', t => {
  let middlewareCalled = false
  const heroku = new Heroku({
    middleware: (res, cb) => {
      middlewareCalled = true
      t.truthy(res)
      cb()
    }
  })
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(200, [])

  return heroku.get('/apps')
    .then(() => {
      t.true(middlewareCalled)
      api.done()
    })
})
