import env from '@/main/config/env'
import { setupApp } from '@/main/config/app'
import mongoose from '@/domain/db/conn'

import { Express } from 'express'
import request from 'supertest'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Note from '@/domain/models/mongodb/note'

dayjs.extend(utc)

let app: Express

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
  })

  describe('POST /note', () => {
    test('Should return 204 on add note with valid accessToken', async () => {
      await request(app)
        .post('/api-notes/note/create')
        .send({
          note: 'nome do exemplo'
        })
        .expect(204)
    })
  })

  describe('PATCH /note/update/:_id', () => {
    test('Should return 204 on update note with valid accessToken', async () => {
      const note = await new Note({
        note: 'nome do exemplo'
      })
      const res = await note.save()
      await request(app)
        .patch(`/api-notes/note/update/${res._id.toHexString()}`)
        .send({
          note: 'nome do exemplo'
        })
        .expect(204)
    })
  })

  describe('DELETE /note/remove/:_id', () => {
    test('Should return 204 on remove note with valid accessToken', async () => {
      const note = await new Note({
        note: 'nome do exemplo'
      })
      const res = await note.save()
      await request(app)
        .delete(`/api-notes/note/remove/${res._id.toHexString()}`)
        .expect(204)
    })
  })

  describe('GET /note', () => {
    test('Should return 200 on load notes with valid accessToken', async () => {
      const note = await new Note({
        note: 'nome do exemplo'
      })

      note.save()

      await request(app)
        .get('/api-notes/note/')
        .expect(200)
    })
  })

  describe('GET /note/:_id', () => {
    test('Should return 200 on load notes with valid accessToken', async () => {
      const note = await new Note({
        note: 'nome do exemplo'
      })
      const res = await note.save()
      await request(app)
        .get(`/api-notes/note/${res._id.toHexString()}`)
        .expect(200)
    })
  })
})
