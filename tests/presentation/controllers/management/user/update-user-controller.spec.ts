import { UpdateUserController } from '@/presentation/controllers/management/user/update-user-controller'
import { serverError, noContent, forbidden } from '@/presentation/helpers'
import {
  GetByEmailUserSpy,
  GetByIdUserSpy,
  UpdateUserSpy
} from '@/tests/presentation/mocks/management/mock-user'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import {
  EmailInUseError,
  InvalidParamError
} from '@/presentation/errors'
import { DifferentPasswordsError } from '@/presentation/errors/different-passwords-error'

const userId = faker.datatype.uuid()
const mockRequest = (
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string
): UpdateUserController.Request => ({
  name: name,
  email: email,
  password: password,
  confirmPassword: confirmPassword,
  user: {
    id: userId
  },
  userId: userId
})

type SutTypes = {
  sut: UpdateUserController
  getByIdUserSpy: GetByIdUserSpy
  getByEmailSpy: GetByEmailUserSpy
  updateUserSpy: UpdateUserSpy
}

const makeSut = (): SutTypes => {
  const getByIdUserSpy = new GetByIdUserSpy()
  const getByEmailSpy = new GetByEmailUserSpy()
  const updateUserSpy = new UpdateUserSpy()

  const sut = new UpdateUserController(
    getByIdUserSpy,
    getByEmailSpy,
    updateUserSpy
  )
  return {
    sut,
    getByIdUserSpy,
    getByEmailSpy,
    updateUserSpy
  }
}

describe('UpdateUser Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdateUser with correct values', async () => {
    const { sut, updateUserSpy, getByEmailSpy } = makeSut()
    getByEmailSpy.result = null
    const password = faker.internet.password()
    const request = mockRequest(
      faker.name.findName(),
      faker.internet.email(),
      password,
      password
    )
    await sut.handle(request)
    expect(updateUserSpy.data.email).toBe(request.email)
    expect(updateUserSpy.data.name).toBe(request.name)
    expect(updateUserSpy.data.password).toBe(request.password)
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

  test('Should return 204 if email in use', async () => {
    const { sut, getByIdUserSpy } = makeSut()
    getByIdUserSpy.result = null
    const password = faker.internet.password()
    const request = mockRequest(
      faker.name.findName(),
      faker.internet.email(),
      password,
      password
    )
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
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

  test('Should return 500 if UpdateUser throws', async () => {
    const { sut, updateUserSpy, getByEmailSpy } = makeSut()
    const password = faker.internet.password()
    getByEmailSpy.result = null
    jest.spyOn(updateUserSpy, 'update').mockImplementationOnce(throwError)
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
