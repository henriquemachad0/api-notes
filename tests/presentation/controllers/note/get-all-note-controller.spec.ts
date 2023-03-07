import { GetAllNoteController } from '@/presentation/controllers/note/get-all-note-controller'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { GetAllNoteSpy } from '@/tests/presentation/mocks/note/mock-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import { GetByIdUserSpy } from '../../mocks/management/mock-user'

const mockRequest = (): GetAllNoteController.Request => ({
  user: { id: null, token: null }
})

type SutTypes = {
  sut: GetAllNoteController
  getAllNoteSpy: GetAllNoteSpy
}

const makeSut = (): SutTypes => {
  const getByIdUserSpy = new GetByIdUserSpy()
  const getAllNoteSpy = new GetAllNoteSpy()
  const sut = new GetAllNoteController(
    getByIdUserSpy,
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
