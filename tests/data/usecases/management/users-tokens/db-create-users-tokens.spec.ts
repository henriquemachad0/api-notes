import { DbCreateUsersTokens } from '@/data/usecases/management/users-tokens/db-create-users-tokens'
import { CreateUsersTokensRepositorySpy } from '@/tests/data/mocks/management/mock-db-users-tokens'
import { throwError } from '@/tests/domain/mocks/test-helpers'
import { mockCreateUsersTokens } from '@/tests/domain/mocks/management/mock-users-tokens'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbCreateUsersTokens
  createUsersTokensRepositorySpy: CreateUsersTokensRepositorySpy
}

const makeSut = (): SutTypes => {
  const createUsersTokensRepositorySpy = new CreateUsersTokensRepositorySpy()
  const sut = new DbCreateUsersTokens(createUsersTokensRepositorySpy)
  return {
    sut,
    createUsersTokensRepositorySpy
  }
}

describe('DbCreateUsersTokens Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CreateUsersTokensRepository with correct values', async () => {
    const { sut, createUsersTokensRepositorySpy } = makeSut()
    const usersTokensData = mockCreateUsersTokens()
    await sut.create(usersTokensData)
    expect(createUsersTokensRepositorySpy.data).toEqual(usersTokensData)
  })

  test('Should throw if CreateUsersTokensRepository throws', async () => {
    const { sut, createUsersTokensRepositorySpy } = makeSut()
    jest.spyOn(createUsersTokensRepositorySpy, 'create').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateUsersTokens())
    await expect(promise).rejects.toThrow()
  })
})
