import request from 'supertest'

import mongoose from 'mongoose'
import app from '../src/app'

describe('Test app.ts', () => {
  test('Catch-all route', async () => {
    const res = await request(app).get('/')
    expect(res.text).toEqual('API is running.')
  })
})

describe('Test Mongoose Connection', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL!)
  })

  test('Has valid connection', () => {
    const isConnected = mongoose.connection.readyState
    expect(isConnected).toBe(1)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})
