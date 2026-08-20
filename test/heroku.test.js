'use strict'

import { test, expect, beforeAll, vi } from 'vitest'
import nock from 'nock'
import Heroku from '../lib/index.js'
import url from '../lib/url.js'

const heroku = new Heroku()

beforeAll(() => {
  nock.disableNetConnect()
})

test('get /apps', () => {
  const api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(200, [{ name: 'myapp' }])

  return heroku.get('/apps')
    .then(apps => {
      expect(apps[0].name).toBe('myapp')
    })
    .then(() => api.done())
})

test('post /apps', () => {
  const api = nock('https://api.heroku.com')
    .post('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.post('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      expect(apps).toEqual({})
    })
    .then(() => api.done())
})

test('delete /apps', () => {
  const api = nock('https://api.heroku.com')
    .delete('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.delete('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      expect(apps).toEqual({})
    })
    .then(() => api.done())
})

test('patch /apps', () => {
  const api = nock('https://api.heroku.com')
    .patch('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.patch('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      expect(apps).toEqual({})
    })
    .then(() => api.done())
})

test('put /apps', () => {
  const api = nock('https://api.heroku.com')
    .put('/apps', { name: 'myapp' })
    .reply(201)

  return heroku.put('/apps', { body: { name: 'myapp' } })
    .then(apps => {
      expect(apps).toEqual({})
    })
    .then(() => api.done())
})

test('non-http', () => {
  const api = nock('http://api.heroku.com')
    .get('/apps')
    .reply(200, [{ name: 'myapp' }])

  return heroku.get('/apps', { host: 'http://api.heroku.com' })
    .then(apps => {
      expect(apps[0].name).toBe('myapp')
    })
    .then(() => api.done())
})

test('url: https', () => {
  expect(url('https://api.heroku.com').secure).toBe(true)
  expect(url('api.heroku.com').secure).toBe(true)
})

test('url: http', () => {
  expect(url('http://api.heroku.com').secure).toBe(false)
})

test('request does not produce any stderr', async () => {
  // this relates to leaky node deprecation warnings hitting
  // the console

  const writes = []
  const spy = vi.spyOn(process.stderr, 'write').mockImplementation(chunk => {
    writes.push(chunk.toString())
    return true
  })

  const api = nock('https://api.heroku.com')
    .get('/apps')
    .reply(200, [])

  await heroku.get('/apps')

  api.done()
  spy.mockRestore()

  // no stderr errors from running the client
  expect(writes.join('')).toBe('')
})
