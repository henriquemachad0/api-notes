import { UsersTokensRepository } from '@/infra/db/mongodb/management/users-tokens-repository'
import mongoose, { connectMongo } from '@/domain/db/conn'

import faker from 'faker'
import User from '@/domain/models/mongodb/management/user/user'
import UserTokens from '@/domain/models/mongodb/management/user/user-tokens'

import FakeObjectId from 'bson-objectid'
import { mockCreateUsersTokens } from '@/tests/domain/mocks/management/mock-users-tokens'
import { sign } from 'jsonwebtoken'
import auth from '@/main/config/auth'

const makeSut = (): UsersTokensRepository => {
  return new UsersTokensRepository()
}

describe('UsersTokensRepository', () => {
  beforeAll(async () => {
    await connectMongo()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await UserTokens.deleteMany({})
  })

  describe('create()', () => {
    test('Should create a user on success', async () => {
      const sut = makeSut()
      await sut.create(mockCreateUsersTokens())
      const count = await UserTokens.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('findByUserIdAndRefreshToken()', () => {
    test('Should get userAccount by user id and refresh token on success', async () => {
      const user = new User({
        email: 'teste@gmail.com',
        password: '123'
      })
      const resUser = await user.save()

      const { expires_in_token, secret_token } = auth

      const token = sign({}, secret_token, {
        subject: resUser._id.toString(),
        expiresIn: expires_in_token
      })

      const userTokens = new UserTokens({
        refresh_token: token,
        user_id: user._id
      })
      await userTokens.save()

      const sut = makeSut()
      const userAccount = await sut.findByUserIdAndRefreshToken(user._id, token)
      expect(userAccount).toBeTruthy()
      expect(userAccount._id).toBeTruthy()
    })

    test('Should return null if userAccount does not exists', async () => {
      const sut = makeSut()
      const { expires_in_token, secret_token } = auth

      const token = sign({}, secret_token, {
        subject: faker.datatype.uuid(),
        expiresIn: expires_in_token
      })
      const userAccount = await sut.findByUserIdAndRefreshToken(new FakeObjectId().toHexString(), token)
      expect(userAccount).toBeFalsy()
    })
  })

  describe('findByRefreshToken()', () => {
    test('Should get userAccount by refresh token on success', async () => {
      const user = new User({
        email: 'teste@gmail.com',
        password: '123'
      })
      const resUser = await user.save()

      const { expires_in_token, secret_token } = auth

      const token = sign({}, secret_token, {
        subject: resUser._id.toString(),
        expiresIn: expires_in_token
      })

      const userTokens = new UserTokens({
        refresh_token: token,
        user_id: user._id
      })
      await userTokens.save()

      const sut = makeSut()
      const userAccount = await sut.findByRefreshToken(token)
      expect(userAccount).toBeTruthy()
      expect(userAccount._id).toBeTruthy()
    })

    test('Should return null if userAccount does not exists', async () => {
      const sut = makeSut()
      const { expires_in_token, secret_token } = auth

      const token = sign({}, secret_token, {
        subject: faker.datatype.uuid(),
        expiresIn: expires_in_token
      })
      const userAccount = await sut.findByRefreshToken(token)
      expect(userAccount).toBeFalsy()
    })
  })

  describe('remove()', () => {
    test('Should remove a user on success', async () => {
      const sut = makeSut()
      const { expires_in_token, secret_token } = auth

      const token = sign({}, secret_token, {
        subject: faker.datatype.uuid(),
        expiresIn: expires_in_token
      })

      const userToken = new UserTokens({
        refresh_token: token,
        user_id: faker.datatype.uuid()
      })
      const res = await userToken.save()

      await sut.remove(res._id.toHexString())
      const count = await UserTokens.countDocuments()
      expect(count).toBe(0)
    })
  })
})
