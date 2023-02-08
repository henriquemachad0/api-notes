import { UserRepository } from '@/infra/db/mongodb/management/user-repository'
import mongoose, { connectMongo } from '@/domain/db/conn'

import faker from 'faker'
import User from '@/domain/models/mongodb/management/user/user'
import UserTokens from '@/domain/models/mongodb/management/user/user-tokens'

import FakeObjectId from 'bson-objectid'

const makeSut = (): UserRepository => {
  return new UserRepository()
}

describe('UserRepository', () => {
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

  describe('register()', () => {
    test('Should register a user on success', async () => {
      const sut = makeSut()
      await sut.register(faker.name.findName(), faker.internet.email(), faker.internet.password())
      const count = await User.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('getByEmail()', () => {
    test('Should get userAccount by email on success', async () => {
      const user = new User({
        email: 'teste@gmail.com',
        password: '123'
      })
      const res = await user.save()
      const sut = makeSut()
      const userAccount = await sut.getByEmail(res.email)
      expect(userAccount).toBeTruthy()
      expect(userAccount._id).toBeTruthy()
    })

    test('Should return null if userAccount does not exists', async () => {
      const sut = makeSut()
      const userAccount = await sut.getByEmail(faker.internet.email())
      expect(userAccount).toBeFalsy()
    })
  })

  describe('getById()', () => {
    test('Should get userAccount by id on success', async () => {
      const user = new User({
        email: 'teste@gmail.com',
        password: '123'
      })
      const res = await user.save()
      const sut = makeSut()
      const userAccount = await sut.getById(res._id)
      expect(userAccount).toBeTruthy()
      expect(userAccount._id).toBeTruthy()
    })

    test('Should return null if userAccount does not exists', async () => {
      const sut = makeSut()
      const userAccount = await sut.getById(new FakeObjectId().toHexString())
      expect(userAccount).toBeFalsy()
    })
  })
})
