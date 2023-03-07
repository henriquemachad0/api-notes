import { RemoveNoteController } from '@/presentation/controllers/note/remove-note-controller'
import { serverError, noContent, forbidden } from '@/presentation/helpers'
import {
  GetByIdNoteSpy,
  RemoveNoteSpy
} from '@/tests/presentation/mocks/note/mock-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
import { GetByIdUserSpy } from '../../mocks/management/mock-user'

const mockRequest = (): RemoveNoteController.Request => ({
  _id: faker.datatype.uuid(),
  user: { id: faker.datatype.uuid(), token: faker.datatype.uuid() }
})

type SutTypes = {
  sut: RemoveNoteController
  removeNoteSpy: RemoveNoteSpy
  getByIdNoteSpy: GetByIdNoteSpy
}

const makeSut = (): SutTypes => {
  const getByIdUserSpy = new GetByIdUserSpy()
  const removeNoteSpy = new RemoveNoteSpy()
  const getByIdNoteSpy = new GetByIdNoteSpy()
  const sut = new RemoveNoteController(
    getByIdUserSpy,
    getByIdNoteSpy,
    removeNoteSpy
  )
  return {
    sut,
    removeNoteSpy,
    getByIdNoteSpy
  }
}

describe('RemoveNote Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('GetByIdNote in RemoveNote', () => {
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

  test('Should call RemoveNote with correct values', async () => {
    const { sut, removeNoteSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(removeNoteSpy._id).toEqual(request._id)
  })

  test('Should return 500 if RemoveNote throws', async () => {
    const { sut, removeNoteSpy } = makeSut()
    jest
      .spyOn(removeNoteSpy, 'remove')
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
