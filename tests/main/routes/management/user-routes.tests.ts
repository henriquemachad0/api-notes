import env from '@/main/config/env'
import { setupApp } from '@/main/config/app'
import mongoose from '@/domain/db/conn'

import { Express } from 'express'
import request from 'supertest'
import User from '@/domain/models/mongodb/management/user/user'

import auth from '@/main/config/auth'
import bcryptjs from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

let app: Express

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

  return token
}

describe('User Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await mongoose.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('POST /users/register', () => {
    test('Should return 204 on register user', async () => {
      await request(app)
        .post('/api-notes/users/register')
        .send({
          name: 'Nome da empresa',
          email: 'teste@gmail.com',
          password: '123',
          confirmPassword: '123'
        })
        .expect(204)
    })
  })

  describe('POST /users/login', () => {
    test('Should return 204 on login user', async () => {
      const salt = await bcryptjs.genSalt(12)
      const passwordHash = await bcryptjs.hash('123', salt)

      const user = new User({
        email: 'teste@gmail.com',
        password: passwordHash
      })
      await user.save()

      await request(app)
        .post('/api-notes/users/login')
        .send({
          email: 'teste@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })

  describe('PATCH /users/edit', () => {
    test('Should return 204 on update user', async () => {
      const token = await mockAccessToken()

      await request(app)
        .patch('/api-notes/users/edit')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'Nome da empresa teste edit',
          email: 'teste@gmail.com',
          password: '123',
          confirmPassword: '123'
        })
        .expect(204)
    })
  })
})
