import mongoose, { connectMongo } from '@/domain/db/conn'

import { LogMongoRepository } from '@/infra/db/mongodb/log-mongo-repository'
import faker from 'faker'
import Errors from '@/domain/models/mongodb/records/outers/errors'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  beforeAll(async () => {
    await connectMongo()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await Errors.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await Errors.countDocuments()
    expect(count).toBe(1)
  })
})
