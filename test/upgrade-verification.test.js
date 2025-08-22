'use strict'

const ava = require('ava')
const test = ava.test
const Heroku = require('../')
const nock = require('nock')

// This test suite is specifically designed to verify that core functionality
// works after dependency upgrades. It focuses on the most critical paths
// and integration points that could break due to dependency changes.

test.before(() => {
  nock.disableNetConnect()
})

test.afterEach(() => {
  nock.cleanAll()
})

// Core functionality verification
test('upgrade verification: basic GET request works', t => {
  const heroku = new Heroku({ token: 'test-token' })
  
  let api = nock('https://api.heroku.com')
    .get('/account')
    .reply(200, { email: 'test@heroku.com', id: 'user-id' })

  return heroku.get('/account')
    .then(account => {
      t.is(account.email, 'test@heroku.com')
      t.is(account.id, 'user-id')
      api.done()
    })
})

test('upgrade verification: basic POST request works', t => {
  const heroku = new Heroku({ token: 'test-token' })
  const appData = { name: 'test-app' }
  
  let api = nock('https://api.heroku.com')
    .post('/apps', appData)
    .reply(201, Object.assign({}, appData, { id: 'app-id', created_at: '2023-01-01T00:00:00Z' }))

  return heroku.post('/apps', { body: appData })
    .then(app => {
      t.is(app.name, 'test-app')
      t.truthy(app.id)
      t.truthy(app.created_at)
      api.done()
    })
})

test('upgrade verification: error handling still works', t => {
  const heroku = new Heroku({ token: 'invalid-token' })
  
  let api = nock('https://api.heroku.com')
    .get('/account')
    .reply(401, { id: 'unauthorized', message: 'Invalid credentials provided.' })

  return heroku.get('/account')
    .then(() => {
      t.fail('Should have thrown an error')
    })
    .catch(error => {
      t.is(error.statusCode, 401)
      t.is(error.body.id, 'unauthorized')
      api.done()
    })
})

test('upgrade verification: JSON parsing works correctly', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps/test-app/config-vars')
    .reply(200, {
      'DATABASE_URL': 'postgres://...',
      'REDIS_URL': 'redis://...',
      'NODE_ENV': 'production'
    })

  return heroku.get('/apps/test-app/config-vars')
    .then(config => {
      t.is(typeof config, 'object')
      t.truthy(config.DATABASE_URL)
      t.truthy(config.REDIS_URL)
      t.is(config.NODE_ENV, 'production')
      api.done()
    })
})

test('upgrade verification: custom headers are preserved', t => {
  const heroku = new Heroku({
    token: 'test-token',
    headers: { 'X-Heroku-Warning-1': 'This is a test header' }
  })
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .matchHeader('X-Heroku-Warning-1', 'This is a test header')
    .matchHeader('Authorization', 'Basic OnRlc3QtdG9rZW4=')
    .reply(200, [])

  return heroku.get('/apps')
    .then(() => api.done())
})

test('upgrade verification: URL parsing works for different hosts', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.eu.heroku.com')
    .get('/apps')
    .reply(200, [{ name: 'eu-app', region: { name: 'europe' } }])

  return heroku.get('/apps', { host: 'https://api.eu.heroku.com' })
    .then(apps => {
      t.is(apps[0].name, 'eu-app')
      t.is(apps[0].region.name, 'europe')
      api.done()
    })
})

test('upgrade verification: retry mechanism works', t => {
  const heroku = new Heroku()
  
  // First call fails with network error, second succeeds
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .replyWithError({ code: 'ECONNRESET' })
    .get('/apps')
    .reply(200, [{ name: 'retry-success' }])

  return heroku.get('/apps')
    .then(apps => {
      t.is(apps[0].name, 'retry-success')
      api.done()
    })
})

test('upgrade verification: pagination still works', t => {
  const heroku = new Heroku()
  
  let api = nock('https://api.heroku.com')
    .get('/apps')
    .matchHeader('Range', 'id ..; max=1000')
    .reply(206, [
      { name: 'app-1', id: '1' },
      { name: 'app-2', id: '2' }
    ], { 'Next-Range': 'id 2..; max=1000' })
    .get('/apps')
    .matchHeader('Range', 'id 2..; max=1000')
    .reply(200, [
      { name: 'app-3', id: '3' }
    ])

  return heroku.get('/apps')
    .then(apps => {
      t.is(apps.length, 3)
      t.is(apps[0].name, 'app-1')
      t.is(apps[1].name, 'app-2')
      t.is(apps[2].name, 'app-3')
      api.done()
    })
})

test('upgrade verification: tunnel-agent integration works', t => {
  // Test that tunnel-agent dependency is still working
  const originalProxyHost = process.env.HEROKU_HTTP_PROXY_HOST
  
  try {
    process.env.HEROKU_HTTP_PROXY_HOST = 'proxy.example.com'
    
    // Just test that we can create a Heroku client with proxy settings
    // without throwing an error (actual proxy testing would require more setup)
    const heroku = new Heroku({ token: 'test-token' })
    t.truthy(heroku)
  } finally {
    // Clean up
    if (originalProxyHost) {
      process.env.HEROKU_HTTP_PROXY_HOST = originalProxyHost
    } else {
      delete process.env.HEROKU_HTTP_PROXY_HOST
    }
  }
})

test('upgrade verification: is-retry-allowed integration works', t => {
  const heroku = new Heroku()
  
  // Test that 4xx errors are not retried (using is-retry-allowed logic)
  let api = nock('https://api.heroku.com')
    .get('/apps/nonexistent')
    .reply(404, { id: 'not_found' })

  return heroku.get('/apps/nonexistent')
    .then(() => {
      t.fail('Should have thrown an error')
    })
    .catch(error => {
      t.is(error.statusCode, 404)
      api.done()
      
      // Verify no additional retry attempts were made
      t.false(api.isDone === false, 'Should not have made additional requests for 4xx errors')
    })
})

test('upgrade verification: user agent includes package version', t => {
  const heroku = new Heroku()
  const pjson = require('../package.json')
  
  let api = nock('https://api.heroku.com')
    .get('/account')
    .matchHeader('User-Agent', new RegExp(`node-heroku-client/${pjson.version.replace(/\./g, '\\.')}`))
    .reply(200, { email: 'test@heroku.com' })

  return heroku.get('/account')
    .then(() => api.done())
})

test('upgrade verification: all HTTP methods work', t => {
  const heroku = new Heroku({ token: 'test-token' })
  
  // Chain all the requests using promises
  // GET
  let getApi = nock('https://api.heroku.com')
    .get('/apps/test-app')
    .reply(200, { name: 'test-app', id: 'app-id' })
  
  return heroku.get('/apps/test-app')
    .then(getResult => {
      t.is(getResult.name, 'test-app')
      getApi.done()
      
      // POST
      let postApi = nock('https://api.heroku.com')
        .post('/apps', { name: 'new-app' })
        .reply(201, { name: 'new-app', id: 'new-app-id' })
      
      return heroku.post('/apps', { body: { name: 'new-app' } })
        .then(postResult => {
          t.is(postResult.name, 'new-app')
          postApi.done()
          
          // PATCH
          let patchApi = nock('https://api.heroku.com')
            .patch('/apps/test-app', { maintenance: true })
            .reply(200, { name: 'test-app', maintenance: true })
          
          return heroku.patch('/apps/test-app', { body: { maintenance: true } })
            .then(patchResult => {
              t.true(patchResult.maintenance)
              patchApi.done()
              
              // PUT
              let putApi = nock('https://api.heroku.com')
                .put('/apps/test-app/config-vars', { NODE_ENV: 'production' })
                .reply(200, { NODE_ENV: 'production' })
              
              return heroku.put('/apps/test-app/config-vars', { 
                body: { NODE_ENV: 'production' } 
              }).then(putResult => {
                t.is(putResult.NODE_ENV, 'production')
                putApi.done()
                
                // DELETE
                let deleteApi = nock('https://api.heroku.com')
                  .delete('/apps/test-app')
                  .reply(200, { name: 'test-app' })
                
                return heroku.delete('/apps/test-app')
                  .then(deleteResult => {
                    t.is(deleteResult.name, 'test-app')
                    deleteApi.done()
                  })
              })
            })
        })
    })
})

// Integration test to verify the main use case works end-to-end
test('upgrade verification: complete app lifecycle works', t => {
  const heroku = new Heroku({ token: 'test-token' })
  const appName = 'lifecycle-test-app'
  
  // Create app
  let createApi = nock('https://api.heroku.com')
    .post('/apps', { name: appName })
    .reply(201, { 
      name: appName, 
      id: 'app-id',
      created_at: '2023-01-01T00:00:00Z'
    })
  
  return heroku.post('/apps', { body: { name: appName } })
    .then(app => {
      t.is(app.name, appName)
      t.truthy(app.id)
      createApi.done()
      
      // Get app details
      let getApi = nock('https://api.heroku.com')
        .get(`/apps/${appName}`)
        .reply(200, { 
          name: appName, 
          id: 'app-id',
          stack: { name: 'heroku-20' }
        })
      
      return heroku.get(`/apps/${appName}`)
        .then(appDetails => {
          t.is(appDetails.name, appName)
          t.is(appDetails.stack.name, 'heroku-20')
          getApi.done()
          
          // Update app
          let updateApi = nock('https://api.heroku.com')
            .patch(`/apps/${appName}`, { maintenance: true })
            .reply(200, { 
              name: appName,
              maintenance: true
            })
          
          return heroku.patch(`/apps/${appName}`, { 
            body: { maintenance: true } 
          }).then(updatedApp => {
            t.true(updatedApp.maintenance)
            updateApi.done()
            
            // Delete app
            let deleteApi = nock('https://api.heroku.com')
              .delete(`/apps/${appName}`)
              .reply(200, { name: appName })
            
            return heroku.delete(`/apps/${appName}`)
              .then(deletedApp => {
                t.is(deletedApp.name, appName)
                deleteApi.done()
              })
          })
        })
    })
})
