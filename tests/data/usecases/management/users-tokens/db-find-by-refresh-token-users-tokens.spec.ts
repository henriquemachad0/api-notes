import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import { DbFindByRefreshTokenUsersTokens } from '@/data/usecases/management/users-tokens/db-find-by-refresh-token-users-tokens'
import { FindByRefreshTokenUsersTokensRepositorySpy } from '@/tests/data/mocks/management/mock-db-users-tokens'

type SutTypes = {
  sut: DbFindByRefreshTokenUsersTokens
  findByRefreshTokenUsersTokensRepositorySpy: FindByRefreshTokenUsersTokensRepositorySpy
}

const makeSut = (): SutTypes => {
  const findByRefreshTokenUsersTokensRepositorySpy = new FindByRefreshTokenUsersTokensRepositorySpy()
  const sut = new DbFindByRefreshTokenUsersTokens(findByRefreshTokenUsersTokensRepositorySpy)
  return {
    sut,
    findByRefreshTokenUsersTokensRepositorySpy
  }
}

let refreshToken: string

describe('DbFindByRefreshTokenUsersTokens', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    refreshToken = faker.datatype.uuid()
  })

  test('Should call FindByRefreshTokenUsersTokensRepository', async () => {
    const { sut, findByRefreshTokenUsersTokensRepositorySpy } = makeSut()
    await sut.findByRefreshToken(refreshToken)
    expect(findByRefreshTokenUsersTokensRepositorySpy.refreshToken).toBe(refreshToken)
  })

  test('Should return a list of BankAccount on success', async () => {
    const { sut, findByRefreshTokenUsersTokensRepositorySpy } = makeSut()
    const surveys = await sut.findByRefreshToken(refreshToken)
    expect(surveys).toEqual(findByRefreshTokenUsersTokensRepositorySpy.result)
  })

  test('Should throw if FindByRefreshTokenUsersTokensRepository throws', async () => {
    const { sut, findByRefreshTokenUsersTokensRepositorySpy } = makeSut()
    jest.spyOn(findByRefreshTokenUsersTokensRepositorySpy, 'findByRefreshToken').mockImplementationOnce(throwError)
    const promise = sut.findByRefreshToken(refreshToken)
    await expect(promise).rejects.toThrow()
  })
})
