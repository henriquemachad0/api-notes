import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import { DbFindByUserIdAndRefreshTokenUsersTokens } from '@/data/usecases/management/users-tokens/db-find-by-user-id-and-refresh-token-users-tokens'
import { FindByUserIdAndRefreshTokenUsersTokensRepositorySpy } from '@/tests/data/mocks/management/mock-db-users-tokens'

type SutTypes = {
  sut: DbFindByUserIdAndRefreshTokenUsersTokens
  findByUserIdAndRefreshTokenUsersTokensRepositorySpy: FindByUserIdAndRefreshTokenUsersTokensRepositorySpy
}

const makeSut = (): SutTypes => {
  const findByUserIdAndRefreshTokenUsersTokensRepositorySpy = new FindByUserIdAndRefreshTokenUsersTokensRepositorySpy()
  const sut = new DbFindByUserIdAndRefreshTokenUsersTokens(findByUserIdAndRefreshTokenUsersTokensRepositorySpy)
  return {
    sut,
    findByUserIdAndRefreshTokenUsersTokensRepositorySpy
  }
}

let userId: string
let refreshToken: string

describe('DbFindByRefreshTokenUsersTokens', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    userId = faker.datatype.uuid()
    refreshToken = faker.datatype.uuid()
  })

  test('Should call FindByRefreshTokenUsersTokensRepository', async () => {
    const { sut, findByUserIdAndRefreshTokenUsersTokensRepositorySpy } = makeSut()
    await sut.findByUserIdAndRefreshToken(userId, refreshToken)
    expect(findByUserIdAndRefreshTokenUsersTokensRepositorySpy.userId).toBe(userId)
    expect(findByUserIdAndRefreshTokenUsersTokensRepositorySpy.refreshToken).toBe(refreshToken)
  })

  test('Should return a list of BankAccount on success', async () => {
    const { sut, findByUserIdAndRefreshTokenUsersTokensRepositorySpy } = makeSut()
    const surveys = await sut.findByUserIdAndRefreshToken(userId, refreshToken)
    expect(surveys).toEqual(findByUserIdAndRefreshTokenUsersTokensRepositorySpy.result)
  })

  test('Should throw if FindByRefreshTokenUsersTokensRepository throws', async () => {
    const { sut, findByUserIdAndRefreshTokenUsersTokensRepositorySpy } = makeSut()
    jest.spyOn(findByUserIdAndRefreshTokenUsersTokensRepositorySpy, 'findByUserIdAndRefreshToken').mockImplementationOnce(throwError)
    const promise = sut.findByUserIdAndRefreshToken(userId, refreshToken)
    await expect(promise).rejects.toThrow()
  })
})
