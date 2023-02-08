import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import { DbRefreshTokenUsersTokens } from '@/data/usecases/management/users-tokens/db-refresh-token-users-tokens'
import { CreateUsersTokensRepositorySpy } from '@/tests/data/mocks/management/mock-db-users-tokens'
import { mockRefreshTokenUsersTokens } from '@/tests/domain/mocks/management/mock-users-tokens'

type SutTypes = {
  sut: DbRefreshTokenUsersTokens
  createUsersTokensRepositorySpy: CreateUsersTokensRepositorySpy
}

const makeSut = (): SutTypes => {
  const createUsersTokensRepositorySpy = new CreateUsersTokensRepositorySpy()
  const sut = new DbRefreshTokenUsersTokens(createUsersTokensRepositorySpy)
  return {
    sut,
    createUsersTokensRepositorySpy
  }
}

describe('DbRefreshTokenUsersTokens', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call RefreshTokenUsersTokensRepository', async () => {
    const { sut, createUsersTokensRepositorySpy } = makeSut()
    const dataRefreshTokenUsersTokens = mockRefreshTokenUsersTokens()
    await sut.refreshToken(dataRefreshTokenUsersTokens)
    expect(createUsersTokensRepositorySpy.data.user_id).toBe(dataRefreshTokenUsersTokens.user_id)
  })

  test('Should throw if RefreshTokenUsersTokensRepository throws', async () => {
    const { sut, createUsersTokensRepositorySpy } = makeSut()
    const dataRefreshTokenUsersTokens = mockRefreshTokenUsersTokens()
    jest.spyOn(createUsersTokensRepositorySpy, 'create').mockImplementationOnce(throwError)
    const promise = sut.refreshToken(dataRefreshTokenUsersTokens)
    await expect(promise).rejects.toThrow()
  })
})
