import { GetByIdNoteController } from '@/presentation/controllers/note/get-by-id-note-controller'
import { ok, serverError, forbidden } from '@/presentation/helpers'
import { GetByIdNoteSpy } from '@/tests/presentation/mocks/note/mock-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
import { GetByIdUserSpy } from '../../mocks/management/mock-user'

const mockRequest = (): GetByIdNoteController.Request => ({
  _id: faker.datatype.uuid(),
  user: { id: faker.datatype.uuid(), token: faker.datatype.uuid() }
})

type SutTypes = {
  sut: GetByIdNoteController
  getByIdNoteSpy: GetByIdNoteSpy
}

const makeSut = (): SutTypes => {
  const getByIdUserSpy = new GetByIdUserSpy()
  const getByIdNoteSpy = new GetByIdNoteSpy()
  const sut = new GetByIdNoteController(
    getByIdUserSpy,
    getByIdNoteSpy
  )
  return {
    sut,
    getByIdNoteSpy
  }
}

describe('GetByIdNote Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call GetByIdNote with correct value', async () => {
    const { sut, getByIdNoteSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(getByIdNoteSpy._id).toBe(request._id)
  })

  test('Should return 200 on success', async () => {
    const { sut, getByIdNoteSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(getByIdNoteSpy.result))
  })

  test('Should return 204 if GetByIdNote returns empty', async () => {
    const { sut, getByIdNoteSpy } = makeSut()
    getByIdNoteSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('_id')))
  })

  test('Should return 500 if GetByIdNote throws', async () => {
    const { sut, getByIdNoteSpy } = makeSut()
    jest
      .spyOn(getByIdNoteSpy, 'getById')
      .mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
