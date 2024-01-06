import mongoose from 'mongoose'
import request from 'supertest'

import { config } from 'dotenv'
import app from '../../../src/app'

config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL!)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()

  await mongoose.connection.close()
})

let token: string = '',
  noteId: string = ''

describe('POST /api/notes', () => {
  it('should return 201 CREATED', async () => {
    await request(app).post('/api/auth/signup').send({
      name: 'test',
      email: 'test@m.com',
      password: '123456',
      username: 'test-case-notes-creation',
      confirmPassword: '123456',
    })

    const user = await request(app).post('/api/auth/login').send({
      username: 'test-case-notes-creation',
      password: '123456',
    })

    const userRes = JSON.parse(user.text)

    token = userRes.data.token

    const noteData = {
      title: 'test',
      content: 'test content',
    }

    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(noteData)
      .set('Accept', 'application/json')

    const resp = JSON.parse(res.text)

    noteId = resp.data._id

    expect(resp.statuscode).toBe(201)
  })
})

describe('GET /api/notes', () => {
  it('should return 200 OK', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')

    const resp = JSON.parse(res.text)

    expect(resp.statuscode).toBe(200)
    expect(resp.message).toBe('Notes retrieved successfully.')
    expect(resp.data.length).toBeGreaterThan(0)
  })
})

describe('GET /api/notes/:noteId', () => {
  it('should return 200 OK', async () => {
    const res = await request(app)
      .get(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')

    const resp = JSON.parse(res.text)
    expect(resp.statuscode).toBe(200)
    expect(resp.data.length).toBeGreaterThan(0)
  })
})

describe('PUT /api/notes/:noteId', () => {
  it('should return 200 OK', async () => {
    const noteData = {
      title: 'test 1',
      content: 'test content 1',
    }

    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(noteData)
      .set('Accept', 'application/json')

    const resp = JSON.parse(res.text)
    expect(resp.statuscode).toBe(200)
  })
})
