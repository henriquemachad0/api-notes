import { UpdateNoteController } from '@/presentation/controllers/note/update-note-controller'
import { serverError, noContent, forbidden } from '@/presentation/helpers'
import {
  GetByIdNoteSpy,
  UpdateNoteSpy
} from '@/tests/presentation/mocks/note/mock-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'

const mockRequest = (): UpdateNoteController.Request => ({
  note: faker.name.findName()
})

type SutTypes = {
  sut: UpdateNoteController
  updateNoteSpy: UpdateNoteSpy
  getByIdNoteSpy: GetByIdNoteSpy
}

const makeSut = (): SutTypes => {
  const updateNoteSpy = new UpdateNoteSpy()
  const getByIdNoteSpy = new GetByIdNoteSpy()
  const sut = new UpdateNoteController(
    getByIdNoteSpy,
    updateNoteSpy
  )
  return {
    sut,
    updateNoteSpy,
    getByIdNoteSpy
  }
}

describe('UpdateNote Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('GetByIdNote in UpdateNote', () => {
    test('Should call GetByIdNote with correct value', async () => {
      const { sut, getByIdNoteSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(getByIdNoteSpy._id).toBe(request._id)
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

  test('Should call UpdateNote with correct values', async () => {
    const { sut, updateNoteSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateNoteSpy.params).toEqual(request)
  })

  test('Should return 500 if UpdateNote throws', async () => {
    const { sut, updateNoteSpy } = makeSut()
    jest
      .spyOn(updateNoteSpy, 'update')
      .mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
