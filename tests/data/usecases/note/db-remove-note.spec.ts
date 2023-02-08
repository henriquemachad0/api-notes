import { DbRemoveNote } from '@/data/usecases/note/db-remove-note'
import { RemoveNoteRepositorySpy } from '@/tests/data/mocks/note/mock-db-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbRemoveNote
  removeNoteRepositorySpy: RemoveNoteRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeNoteRepositorySpy = new RemoveNoteRepositorySpy()
  const sut = new DbRemoveNote(removeNoteRepositorySpy)
  return {
    sut,
    removeNoteRepositorySpy
  }
}

let _id: string

describe('DbRemoveNote', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    _id = faker.datatype.uuid()
  })

  test('Should call RemoveNoteRepository', async () => {
    const { sut, removeNoteRepositorySpy } = makeSut()
    await sut.remove(_id)
    expect(removeNoteRepositorySpy._id).toBe(_id)
  })

  test('Should throw if RemoveNoteRepository throws', async () => {
    const { sut, removeNoteRepositorySpy } = makeSut()
    jest.spyOn(removeNoteRepositorySpy, 'remove').mockImplementationOnce(throwError)
    const promise = sut.remove(_id)
    await expect(promise).rejects.toThrow()
  })
})
