import { DbRegisterCompany } from '@/data/usecases/management/company/db-register-company'
import { RegisterCompanyRepositorySpy } from '@/tests/data/mocks/management/mock-db-company'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbRegisterCompany
  registerCompanyRepositorySpy: RegisterCompanyRepositorySpy
}

const makeSut = (): SutTypes => {
  const registerCompanyRepositorySpy = new RegisterCompanyRepositorySpy()
  const sut = new DbRegisterCompany(registerCompanyRepositorySpy)
  return {
    sut,
    registerCompanyRepositorySpy
  }
}

let userId: string

describe('DbRegisterCompany', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    userId = faker.datatype.uuid()
  })

  test('Should call RegisterCompanyRepository', async () => {
    const { sut, registerCompanyRepositorySpy } = makeSut()
    await sut.register(userId)
    expect(registerCompanyRepositorySpy.userId).toBe(userId)
  })

  test('Should return a list of Company on success', async () => {
    const { sut, registerCompanyRepositorySpy } = makeSut()
    const surveys = await sut.register(userId)
    expect(surveys).toEqual(registerCompanyRepositorySpy.result)
  })

  test('Should throw if RegisterCompanyRepository throws', async () => {
    const { sut, registerCompanyRepositorySpy } = makeSut()
    jest.spyOn(registerCompanyRepositorySpy, 'register').mockImplementationOnce(throwError)
    const promise = sut.register(userId)
    await expect(promise).rejects.toThrow()
  })
})
