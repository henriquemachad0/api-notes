import { LoginUserController } from '@/presentation/controllers/management/user/login-user-controller'
import { serverError, forbidden, ok } from '@/presentation/helpers'
import {
  GetByEmailUserSpy,
  LoginUserSpy
} from '@/tests/presentation/mocks/management/mock-user'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import {
  MissingParamError
} from '@/presentation/errors'
import bcryptjs from 'bcryptjs'
import { CreateUsersTokensSpy } from '@/tests/presentation/mocks/management/mock-users-tokens'
import { GenericError } from '@/presentation/errors/generic-error'

const mockRequest = (
  email?: string,
  password?: string
): LoginUserController.Request => ({
  email: email,
  password: password
})

type SutTypes = {
  sut: LoginUserController
  getByEmailSpy: GetByEmailUserSpy
  createUsersTokensSpy: CreateUsersTokensSpy
  loginUserSpy: LoginUserSpy
}

const makeSut = (): SutTypes => {
  const getByEmailSpy = new GetByEmailUserSpy()
  const createUsersTokensSpy = new CreateUsersTokensSpy()
  const loginUserSpy = new LoginUserSpy()

  const sut = new LoginUserController(getByEmailSpy, loginUserSpy)
  return {
    sut,
    getByEmailSpy,
    createUsersTokensSpy,
    loginUserSpy
  }
}

describe('LoginUser Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return 204 if invalid password', async () => {
    const { sut } = makeSut()
    const request = mockRequest(
      faker.internet.email(),
      faker.internet.password()
    )
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(
      forbidden(new MissingParamError('Invalid password'))
    )
  })

  test('Should return 200 on success', async () => {
    const { sut, loginUserSpy } = makeSut()
    const compare = jest.spyOn(bcryptjs, 'compare')
    compare.mockImplementation(() => () => ({ compare: 'true' }))

    const httpResponse = await sut.handle(
      mockRequest('teste@gmail.com', '123')
    )

    expect(httpResponse).toEqual(ok(loginUserSpy.result))
  })

  test('Should return 204 if email is null', async () => {
    const { sut, getByEmailSpy } = makeSut()
    getByEmailSpy.result = null
    const password = faker.internet.password()
    const request = mockRequest(faker.internet.email(), password)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(
      forbidden(new GenericError('There is no user registered with this email'))
    )
  })

  test('Should return 204 if password is null', async () => {
    const { sut } = makeSut()
    const request = mockRequest(faker.internet.email(), null)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new MissingParamError('password')))
  })

  test('Should return 204 if email is null', async () => {
    const { sut } = makeSut()
    const request = mockRequest(null, '123')
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new MissingParamError('email')))
  })

  test('Should return 500 if UpdateUser throws', async () => {
    const { sut, loginUserSpy } = makeSut()
    jest.spyOn(loginUserSpy, 'login').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(
      mockRequest(faker.internet.email(), faker.internet.password())
    )
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
