import { RegisterUserController } from '@/presentation/controllers/management/user/register-user-controller'
import { serverError, noContent, forbidden } from '@/presentation/helpers'
import {
  GetByEmailUserSpy,
  RegisterUserSpy,
  UpdateUserSpy
} from '@/tests/presentation/mocks/management/mock-user'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import { RegisterCompanySpy } from '@/tests/presentation/mocks/management/mock-company'
import {
  EmailInUseError,
  MissingParamError
} from '@/presentation/errors'
import { DifferentPasswordsError } from '@/presentation/errors/different-passwords-error'

const mockRequest = (
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string
): RegisterUserController.Request => ({
  name: name,
  email: email,
  password: password,
  confirmPassword: confirmPassword
})

type SutTypes = {
  sut: RegisterUserController
  getByEmailSpy: GetByEmailUserSpy
  registerCompanySpy: RegisterCompanySpy
  registerUserSpy: RegisterUserSpy
  updateUserSpy: UpdateUserSpy
}

const makeSut = (): SutTypes => {
  const getByEmailSpy = new GetByEmailUserSpy()
  const registerCompanySpy = new RegisterCompanySpy()
  const registerUserSpy = new RegisterUserSpy()
  const updateUserSpy = new UpdateUserSpy()

  const sut = new RegisterUserController(
    getByEmailSpy,
    registerCompanySpy,
    registerUserSpy,
    updateUserSpy
  )
  return {
    sut,
    getByEmailSpy,
    registerCompanySpy,
    registerUserSpy,
    updateUserSpy
  }
}

describe('RegisterUser Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call RegisterUser with correct values', async () => {
    const { sut, registerUserSpy, getByEmailSpy } = makeSut()
    getByEmailSpy.result = null
    const password = faker.internet.password()
    const request = mockRequest(
      faker.name.findName(),
      faker.internet.email(),
      password,
      password
    )
    await sut.handle(request)
    expect(registerUserSpy.email).toBe(request.email)
    expect(registerUserSpy.name).toBe(request.name)
    expect(registerUserSpy.password).toBe(request.password)
  })

  test('Should return 204 if email in use', async () => {
    const { sut } = makeSut()
    const password = faker.internet.password()
    const request = mockRequest(
      faker.name.findName(),
      faker.internet.email(),
      password,
      password
    )
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 204 if email is null', async () => {
    const { sut, getByEmailSpy } = makeSut()
    getByEmailSpy.result = null
    const password = faker.internet.password()
    const request = mockRequest(
      faker.name.findName(),
      null,
      password,
      password
    )
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new MissingParamError('email')))
  })

  test('Should return 204 if password is null', async () => {
    const { sut, getByEmailSpy } = makeSut()
    getByEmailSpy.result = null
    const password = faker.internet.password()
    const request = mockRequest(
      faker.name.findName(),
      faker.internet.email(),
      null,
      password
    )
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new MissingParamError('password')))
  })

  test('Should return 204 if confirmPassword is null', async () => {
    const { sut, getByEmailSpy } = makeSut()
    getByEmailSpy.result = null
    const password = faker.internet.password()
    const request = mockRequest(
      faker.name.findName(),
      faker.internet.email(),
      password,
      null
    )
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(
      forbidden(new MissingParamError('confirmPassword'))
    )
  })

  test('Should return 204 if different passwords', async () => {
    const { sut, getByEmailSpy } = makeSut()
    getByEmailSpy.result = null
    const request = mockRequest(
      faker.name.findName(),
      faker.internet.email(),
      faker.internet.password(),
      faker.internet.password()
    )
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(
      forbidden(new DifferentPasswordsError())
    )
  })

  test('Should return 500 if RegisterUser throws', async () => {
    const { sut, registerUserSpy, getByEmailSpy } = makeSut()
    const password = faker.internet.password()
    getByEmailSpy.result = null
    jest.spyOn(registerUserSpy, 'register').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(
      mockRequest(
        faker.name.findName(),
        faker.internet.email(),
        password,
        password
      )
    )
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, getByEmailSpy } = makeSut()
    const password = faker.internet.password()
    getByEmailSpy.result = null
    const httpResponse = await sut.handle(
      mockRequest(
        faker.name.findName(),
        faker.internet.email(),
        password,
        password
      )
    )
    expect(httpResponse).toEqual(noContent())
  })
})
