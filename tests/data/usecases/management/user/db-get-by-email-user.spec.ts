import { DbGetByEmailUser } from '@/data/usecases/management/user/db-get-by-email-user'
import { GetByEmailUserRepositorySpy } from '@/tests/data/mocks/management/mock-db-user'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbGetByEmailUser
  getByEmailUserRepositorySpy: GetByEmailUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const getByEmailUserRepositorySpy = new GetByEmailUserRepositorySpy()
  const sut = new DbGetByEmailUser(getByEmailUserRepositorySpy)
  return {
    sut,
    getByEmailUserRepositorySpy
  }
}

let email: string

describe('DbGetByEmailUser', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    email = faker.internet.email()
  })

  test('Should call GetByEmailUserRepository', async () => {
    const { sut, getByEmailUserRepositorySpy } = makeSut()
    await sut.getByEmail(email)
    expect(getByEmailUserRepositorySpy.email).toBe(email)
  })

  test('Should return a list of User on success', async () => {
    const { sut, getByEmailUserRepositorySpy } = makeSut()
    const surveys = await sut.getByEmail(email)
    expect(surveys).toEqual(getByEmailUserRepositorySpy.result)
  })

  test('Should throw if GetByEmailUserRepository throws', async () => {
    const { sut, getByEmailUserRepositorySpy } = makeSut()
    jest.spyOn(getByEmailUserRepositorySpy, 'getByEmail').mockImplementationOnce(throwError)
    const promise = sut.getByEmail(email)
    await expect(promise).rejects.toThrow()
  })
})
