import { DbCreateNote } from '@/data/usecases/note/db-create-note'
import { CreateNoteRepositorySpy } from '@/tests/data/mocks/note/mock-db-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'
import { mockCreateNoteParams } from '@/tests/domain/mocks/note/mock-note'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbCreateNote
  createNoteRepositorySpy: CreateNoteRepositorySpy
}

const makeSut = (): SutTypes => {
  const createNoteRepositorySpy = new CreateNoteRepositorySpy()
  const sut = new DbCreateNote(createNoteRepositorySpy)
  return {
    sut,
    createNoteRepositorySpy
  }
}

describe('DbCreateNote Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CreateNoteRepository with correct values', async () => {
    const { sut, createNoteRepositorySpy } = makeSut()
    const noteData = mockCreateNoteParams()
    await sut.create(noteData)
    expect(createNoteRepositorySpy.params).toEqual(noteData)
  })

  test('Should throw if CreateNoteRepository throws', async () => {
    const { sut, createNoteRepositorySpy } = makeSut()
    jest.spyOn(createNoteRepositorySpy, 'create').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateNoteParams())
    await expect(promise).rejects.toThrow()
  })
})
