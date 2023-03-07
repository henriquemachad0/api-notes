import env from '@/main/config/env'
import { setupApp } from '@/main/config/app'
import mongoose from '@/domain/db/conn'

import { Express } from 'express'
import request from 'supertest'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Note from '@/domain/models/mongodb/note'
import User from '@/domain/models/mongodb/management/user/user'

import auth from '@/main/config/auth'
import { sign } from 'jsonwebtoken'

dayjs.extend(utc)

let app: Express

let userId: string = ''

const mockAccessToken = async (): Promise<string> => {
  const user = new User({
    email: 'teste@gmail.com',
    password: '123'
  })
  const res = await user.save()

  const { expires_in_token, secret_token } = auth

  const token = sign({}, secret_token, {
    subject: res._id.toString(),
    expiresIn: expires_in_token
  })

  userId = res._id

  return token
}

describe('Note Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await mongoose.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  afterEach(async () => {
    await Note.deleteMany({})
    await User.deleteMany({})
  })

  describe('POST /note', () => {
    test('Should return 403 on add note without accessToken', async () => {
      await request(app)
        .post('/api-notes/note/create')
        .send({
          note: 'nome do exemplo'
        })
        .expect(403)
    })

    test('Should return 204 on add note with valid accessToken', async () => {
      const token = await mockAccessToken()
      await request(app)
        .post('/api-notes/note/create')
        .auth(token, { type: 'bearer' })
        .send({
          note: 'nome do exemplo'
        })
        .expect(204)
    })
  })

  describe('PATCH /note/update/:_id', () => {
    test('Should return 403 on update note without accessToken', async () => {
      const note = await new Note({
        note: 'nome do exemplo'
      })
      const res = await note.save()
      await request(app)
        .patch(`/api-notes/note/update/${res._id.toHexString()}`)
        .send({
          note: 'nome do exemplo'
        })
        .expect(403)
    })

    test('Should return 204 on update note with valid accessToken', async () => {
      const token = await mockAccessToken()
      const note = await new Note({
        userId: userId,
        note: 'nome do exemplo'
      })
      const res = await note.save()
      await request(app)
        .patch(`/api-notes/note/update/${res._id.toHexString()}`)
        .auth(token, { type: 'bearer' })
        .send({
          note: 'nome do exemplo'
        })
        .expect(204)
    })
  })

  describe('DELETE /note/remove/:_id', () => {
    test('Should return 403 on remove note without accessToken', async () => {
      await request(app)
        .delete('/api-notes/note/remove/any_id')
        .expect(403)
    })

    test('Should return 204 on remove note with valid accessToken', async () => {
      const token = await mockAccessToken()
      const note = await new Note({
        userId: userId,
        note: 'nome do exemplo'
      })
      const res = await note.save()
      await request(app)
        .delete(`/api-notes/note/remove/${res._id.toHexString()}`)
        .auth(token, { type: 'bearer' })
        .expect(204)
    })
  })

  describe('GET /note', () => {
    test('Should return 403 on load notes without accessToken', async () => {
      await request(app)
        .get('/api-notes/note/')
        .expect(403)
    })
    test('Should return 200 on load notes with valid accessToken', async () => {
      const token = await mockAccessToken()
      const note = await new Note({
        userId: userId,
        note: 'nome do exemplo'
      })

      note.save()

      await request(app)
        .get('/api-notes/note/')
        .auth(token, { type: 'bearer' })
        .expect(200)
    })
  })

  describe('GET /note/:_id', () => {
    test('Should return 403 on load notes without accessToken', async () => {
      await request(app)
        .get('/api-notes/note/any_id')
        .expect(403)
    })

    test('Should return 200 on load notes with valid accessToken', async () => {
      const token = await mockAccessToken()
      const note = await new Note({
        userId: userId,
        note: 'nome do exemplo'
      })
      const res = await note.save()
      await request(app)
        .get(`/api-notes/note/${res._id.toHexString()}`)
        .auth(token, { type: 'bearer' })
        .expect(200)
    })
  })
})
