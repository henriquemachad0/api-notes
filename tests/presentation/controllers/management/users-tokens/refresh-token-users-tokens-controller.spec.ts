import { RefreshTokenUsersTokensController } from '@/presentation/controllers/management/users-tokens/refresh-token-users-tokens-controller'
import { serverError, forbidden, ok } from '@/presentation/helpers'
import {
  FindByUserIdAndRefreshTokenUsersTokensSpy,
  RefreshTokenUsersTokensSpy,
  RemoveUsersTokensSpy
} from '@/tests/presentation/mocks/management/mock-users-tokens'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import jwt, { sign } from 'jsonwebtoken'
import auth from '@/main/config/auth'
import { GenericError } from '@/presentation/errors/generic-error'

const { expires_in_token, secret_token } = auth

const mockRequest = (
  token: string
): RefreshTokenUsersTokensController.Request => ({
  token: token
})

const mockAccessToken = (): string => {
  const { expires_in_token, secret_token } = auth

  const token = sign({}, secret_token, {
    subject: faker.datatype.uuid(),
    expiresIn: expires_in_token
  })

  return token
}
type SutTypes = {
  sut: RefreshTokenUsersTokensController
  findByUserIdAndRefreshTokenUsersTokensSpy: FindByUserIdAndRefreshTokenUsersTokensSpy
  removeUsersTokensSpy: RemoveUsersTokensSpy
  refreshTokenUsersTokensSpy: RefreshTokenUsersTokensSpy
}

const makeSut = (): SutTypes => {
  const findByUserIdAndRefreshTokenUsersTokensSpy =
    new FindByUserIdAndRefreshTokenUsersTokensSpy()
  const removeUsersTokensSpy = new RemoveUsersTokensSpy()
  const refreshTokenUsersTokensSpy = new RefreshTokenUsersTokensSpy()

  const sut = new RefreshTokenUsersTokensController(
    findByUserIdAndRefreshTokenUsersTokensSpy,
    removeUsersTokensSpy,
    refreshTokenUsersTokensSpy
  )
  return {
    sut,
    findByUserIdAndRefreshTokenUsersTokensSpy,
    removeUsersTokensSpy,
    refreshTokenUsersTokensSpy
  }
}

describe('RefreshTokenUsersTokens Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return 500 if RefreshTokenUsersTokens throws', async () => {
    const { sut, refreshTokenUsersTokensSpy } = makeSut()
    const token = sign({}, secret_token, {
      subject: faker.datatype.uuid(),
      expiresIn: expires_in_token
    })
    jest
      .spyOn(refreshTokenUsersTokensSpy, 'refreshToken')
      .mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest(token))
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, refreshTokenUsersTokensSpy } = makeSut()
    const token = mockAccessToken()
    const verify = jest.spyOn(jwt, 'verify')
    verify.mockImplementation(() => () => ({ verified: 'true' }))

    const httpResponse = await sut.handle(mockRequest(token))
    expect(httpResponse).toEqual(ok(refreshTokenUsersTokensSpy.result))
  })

  test('Should return 204 on token does not exists', async () => {
    const { sut, findByUserIdAndRefreshTokenUsersTokensSpy } = makeSut()
    const token = mockAccessToken()
    findByUserIdAndRefreshTokenUsersTokensSpy.result = null

    const httpResponse = await sut.handle(mockRequest(token))
    expect(httpResponse).toEqual(forbidden(new GenericError('Refresh Token does not exists')))
  })
})
