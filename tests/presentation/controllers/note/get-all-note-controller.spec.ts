import { GetAllNoteController } from '@/presentation/controllers/note/get-all-note-controller'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { GetAllNoteSpy } from '@/tests/presentation/mocks/note/mock-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): GetAllNoteController.Request => ({
  _id: null,
  status: null,
  user: { id: null, token: null }
})
const mockRequestWithParams = (): GetAllNoteController.Request => ({
  _id: faker.datatype.uuid(),
  status: false,
  user: { id: faker.datatype.uuid(), token: faker.datatype.uuid() }
})

type SutTypes = {
  sut: GetAllNoteController
  getAllNoteSpy: GetAllNoteSpy
}

const makeSut = (): SutTypes => {
  const getAllNoteSpy = new GetAllNoteSpy()
  const sut = new GetAllNoteController(
    getAllNoteSpy
  )
  return {
    sut,
    getAllNoteSpy
  }
}

describe('GetAllNote Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call GetAllNote with correct value', async () => {
    const { sut, getAllNoteSpy } = makeSut()
    const request = mockRequestWithParams()
    await sut.handle(request)
    expect(getAllNoteSpy._id).toBe(request._id)
  })

  test('Should return 200 on success', async () => {
    const { sut, getAllNoteSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(getAllNoteSpy.result))
  })

  test('Should return 204 if GetAllNote returns empty', async () => {
    const { sut, getAllNoteSpy } = makeSut()
    getAllNoteSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if GetAllNote throws', async () => {
    const { sut, getAllNoteSpy } = makeSut()
    jest
      .spyOn(getAllNoteSpy, 'getAll')
      .mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
