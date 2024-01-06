import mongoose from 'mongoose'
import request from 'supertest'

import { config } from 'dotenv'
import app from '../../../src/app'

config()

beforeAll(async () => {
  console.log('env', process.env)
  await mongoose.connect(process.env.MONGODB_URL!)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('POST /api/auth/signup', () => {
  it('should return 201 CREATED', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: 'test1221',
      email: 'test12121@m.com',
      password: '123456',
      username: 'testing',
      confirmPassword: '123456',
    })
    const resp = JSON.parse(res.text)
    expect(resp.statuscode).toBe(201)
  })
})

describe('POST /api/auth/login', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testing',
      password: '123456',
    })
    const resp = JSON.parse(res.text)
    expect(resp.statuscode).toBe(200)
    expect(resp.data).toHaveProperty('token') // check if token is returned
    expect(resp.message).toBe('User logged in successfully.')
  })
})
