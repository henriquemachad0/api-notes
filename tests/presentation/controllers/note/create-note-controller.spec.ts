import { CreateNoteController } from '@/presentation/controllers/note/create-note-controller'
import { serverError, noContent } from '@/presentation/helpers'
import { CreateNoteSpy } from '@/tests/presentation/mocks/note/mock-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): CreateNoteController.Request => ({
  note: faker.name.findName()
})

type SutTypes = {
  sut: CreateNoteController
  createNoteSpy: CreateNoteSpy
}

const makeSut = (): SutTypes => {
  const createNoteSpy = new CreateNoteSpy()
  const sut = new CreateNoteController(createNoteSpy)
  return {
    sut,
    createNoteSpy
  }
}

describe('CreateNote Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CreateNote with correct values', async () => {
    const { sut, createNoteSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(createNoteSpy.params).toEqual(request)
  })

  test('Should return 500 if CreateNote throws', async () => {
    const { sut, createNoteSpy } = makeSut()
    jest.spyOn(createNoteSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
