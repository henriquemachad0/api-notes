import { GetByEmailUserController } from '@/presentation/controllers/management/user/get-by-email-user-controller'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { GetByEmailUserSpy } from '@/tests/presentation/mocks/management/mock-user'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): GetByEmailUserController.Request => ({
  email: faker.internet.email()
})

type SutTypes = {
  sut: GetByEmailUserController
  getByEmailUserSpy: GetByEmailUserSpy
}

const makeSut = (): SutTypes => {
  const getByEmailUserSpy = new GetByEmailUserSpy()
  const sut = new GetByEmailUserController(
    getByEmailUserSpy
  )
  return {
    sut,
    getByEmailUserSpy
  }
}

describe('GetByEmailUser Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call GetByEmailUser with correct value', async () => {
    const { sut, getByEmailUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(getByEmailUserSpy.email).toBe(request.email)
  })

  test('Should return 200 on success', async () => {
    const { sut, getByEmailUserSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(getByEmailUserSpy.result))
  })

  test('Should return 204 if GetByEmailUser returns empty', async () => {
    const { sut, getByEmailUserSpy } = makeSut()
    getByEmailUserSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if GetByEmailUser throws', async () => {
    const { sut, getByEmailUserSpy } = makeSut()
    jest
      .spyOn(getByEmailUserSpy, 'getByEmail')
      .mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
