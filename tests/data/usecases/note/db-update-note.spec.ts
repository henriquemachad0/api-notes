import { DbUpdateNote } from '@/data/usecases/note/db-update-note'
import { UpdateNoteRepositorySpy } from '@/tests/data/mocks/note/mock-db-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'
import { mockUpdateNoteParams } from '@/tests/domain/mocks/note/mock-note'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbUpdateNote
  updateNoteRepositorySpy: UpdateNoteRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateNoteRepositorySpy = new UpdateNoteRepositorySpy()
  const sut = new DbUpdateNote(updateNoteRepositorySpy)
  return {
    sut,
    updateNoteRepositorySpy
  }
}
let _id: string

describe('DbUpdateNote Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    _id = faker.datatype.uuid()
  })

  test('Should call UpdateNoteRepository with correct values', async () => {
    const { sut, updateNoteRepositorySpy } = makeSut()
    const noteData = mockUpdateNoteParams()
    await sut.update(noteData, _id)
    expect(updateNoteRepositorySpy.params).toEqual(noteData)
  })

  test('Should throw if UpdateNoteRepository throws', async () => {
    const { sut, updateNoteRepositorySpy } = makeSut()
    jest.spyOn(updateNoteRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateNoteParams(), _id)
    await expect(promise).rejects.toThrow()
  })
})
