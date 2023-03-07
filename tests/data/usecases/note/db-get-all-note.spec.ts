import { DbGetAllNote } from '@/data/usecases/note/db-get-all-note'
import { GetAllNoteRepositorySpy } from '@/tests/data/mocks/note/mock-db-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbGetAllNote
  getAllNoteRepositorySpy: GetAllNoteRepositorySpy
}

const makeSut = (): SutTypes => {
  const getAllNoteRepositorySpy = new GetAllNoteRepositorySpy()
  const sut = new DbGetAllNote(getAllNoteRepositorySpy)
  return {
    sut,
    getAllNoteRepositorySpy
  }
}

let userId: string

describe('DbGetAllNote', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    userId = faker.datatype.uuid()
  })

  test('Should call GetAllNoteRepository', async () => {
    const { sut, getAllNoteRepositorySpy } = makeSut()
    await sut.getAll(userId)
    expect(getAllNoteRepositorySpy.result[0]._id).toBeTruthy()
  })

  test('Should return a list of Note on success', async () => {
    const { sut, getAllNoteRepositorySpy } = makeSut()
    const notes = await sut.getAll(userId)
    expect(notes).toEqual(getAllNoteRepositorySpy.result)
  })

  test('Should throw if GetAllNoteRepository throws', async () => {
    const { sut, getAllNoteRepositorySpy } = makeSut()
    jest.spyOn(getAllNoteRepositorySpy, 'getAll').mockImplementationOnce(throwError)
    const promise = sut.getAll(userId)
    await expect(promise).rejects.toThrow()
  })
})
