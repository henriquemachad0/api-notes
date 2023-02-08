import { DbLoginUser } from '@/data/usecases/management/user/db-login-user'

import MockDate from 'mockdate'
import { CreateUsersTokensSpy } from '@/tests/presentation/mocks/management/mock-users-tokens'
import { mockLoginUserParams } from '@/tests/domain/mocks/management/mock-user'

type SutTypes = {
  sut: DbLoginUser
  createUsersTokensRepositorySpy: CreateUsersTokensSpy
}

const makeSut = (): SutTypes => {
  const createUsersTokensRepositorySpy = new CreateUsersTokensSpy()
  const sut = new DbLoginUser(createUsersTokensRepositorySpy)
  return {
    sut,
    createUsersTokensRepositorySpy
  }
}

describe('DbLoginUser', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoginUserRepository', async () => {
    const { sut, createUsersTokensRepositorySpy } = makeSut()
    const loginParams = mockLoginUserParams()
    await sut.login(loginParams)
    expect(createUsersTokensRepositorySpy.data.user_id).toBe(loginParams.user._id)
  })
})
