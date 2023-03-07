import { CreateNoteController } from '@/presentation/controllers/note/create-note-controller'
import { serverError, noContent } from '@/presentation/helpers'
import { CreateNoteSpy } from '@/tests/presentation/mocks/note/mock-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'
import { GetByIdUserSpy } from '../../mocks/management/mock-user'

const mockRequest = (): CreateNoteController.Request => ({
  user: {
    id: faker.datatype.uuid()
  },
  note: faker.name.findName()
})

type SutTypes = {
  sut: CreateNoteController
  createNoteSpy: CreateNoteSpy
}

const makeSut = (): SutTypes => {
  const getByIdUserSpy = new GetByIdUserSpy()
  const createNoteSpy = new CreateNoteSpy()
  const sut = new CreateNoteController(getByIdUserSpy, createNoteSpy)
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
