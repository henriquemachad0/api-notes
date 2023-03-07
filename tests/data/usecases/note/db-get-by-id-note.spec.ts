import { DbGetByIdNote } from '@/data/usecases/note/db-get-by-id-note'
import { GetByIdNoteRepositorySpy } from '@/tests/data/mocks/note/mock-db-note'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbGetByIdNote
  getByIdNoteRepositorySpy: GetByIdNoteRepositorySpy
}

const makeSut = (): SutTypes => {
  const getByIdNoteRepositorySpy = new GetByIdNoteRepositorySpy()
  const sut = new DbGetByIdNote(getByIdNoteRepositorySpy)
  return {
    sut,
    getByIdNoteRepositorySpy
  }
}

let _id: string
let userId: string

describe('DbGetByIdNote', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    _id = faker.datatype.uuid()
    userId = faker.datatype.uuid()
  })

  test('Should call GetByIdNoteRepository', async () => {
    const { sut, getByIdNoteRepositorySpy } = makeSut()
    await sut.getById(_id, userId)
    expect(getByIdNoteRepositorySpy._id).toBe(_id)
  })

  test('Should return a list of Note on success', async () => {
    const { sut, getByIdNoteRepositorySpy } = makeSut()
    const surveys = await sut.getById(_id, userId)
    expect(surveys).toEqual(getByIdNoteRepositorySpy.result)
  })

  test('Should throw if GetByIdNoteRepository throws', async () => {
    const { sut, getByIdNoteRepositorySpy } = makeSut()
    jest.spyOn(getByIdNoteRepositorySpy, 'getById').mockImplementationOnce(throwError)
    const promise = sut.getById(_id, userId)
    await expect(promise).rejects.toThrow()
  })
})
