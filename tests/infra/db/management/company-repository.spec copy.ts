import { CompanyRepository } from '@/infra/db/mongodb/management/company-repository'
import mongoose, { connectMongo } from '@/domain/db/conn'

import faker from 'faker'
import Company from '@/domain/models/mongodb/management/company/company'

const makeSut = (): CompanyRepository => {
  return new CompanyRepository()
}

describe('CompanyRepository', () => {
  beforeAll(async () => {
    await connectMongo()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await Company.deleteMany({})
  })

  describe('register()', () => {
    test('Should register a company on success', async () => {
      const sut = makeSut()
      await sut.register(faker.datatype.uuid())
      const count = await Company.countDocuments()
      expect(count).toBe(1)
    })
  })
})
