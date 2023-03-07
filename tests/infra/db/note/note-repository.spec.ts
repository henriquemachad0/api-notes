import { NoteRepository } from '@/infra/db/mongodb/note-repository'
import {
  mockCreateNoteParams,
  mockUpdateNoteParams
} from '@/tests/domain/mocks/note/mock-note'
import mongoose, { connectMongo } from '@/domain/db/conn'
import Note from '@/domain/models/mongodb/note'
import FakeObjectId from 'bson-objectid'
import faker from 'faker'
import User from '@/domain/models/mongodb/management/user/user'

const makeSut = (): NoteRepository => {
  return new NoteRepository()
}

describe('NoteRepository', () => {
  beforeAll(async () => {
    await connectMongo()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await Note.deleteMany({})
  })

  afterEach(async () => {

  })

  describe('create()', () => {
    test('Should create a note on success', async () => {
      const sut = makeSut()
      const user = new User({
        email: 'teste@gmail.com',
        password: '123'
      })
      const res = await user.save()
      await sut.create(mockCreateNoteParams(faker.datatype.uuid()), res._id)
      const count = await Note.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('update()', () => {
    test('Should update a note on success', async () => {
      const sut = makeSut()
      const bank = await new Note(mockCreateNoteParams(faker.datatype.uuid()))
      const res = await bank.save()
      await sut.update(mockUpdateNoteParams(), res._id.toHexString())
      const count = await Note.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('remove()', () => {
    test('Should remove a note on success', async () => {
      const sut = makeSut()
      const bank = await new Note(mockCreateNoteParams(faker.datatype.uuid()))
      const res = await bank.save()
      await sut.remove(res._id.toHexString())
      const count = await Note.countDocuments()
      expect(count).toBe(0)
    })
  })

  describe('getAll()', () => {
    test('Should get all note on success', async () => {
      const userId = faker.datatype.uuid()
      const createNoteModels = [
        mockCreateNoteParams(userId),
        mockCreateNoteParams(userId)
      ]
      await Note.insertMany(createNoteModels)
      const sut = makeSut()
      const note = await sut.getAll(createNoteModels[0].userId)
      expect(note.length).toBe(2)
      expect(note[0]._id).toBeTruthy()
      expect(note[1]._id).toBeTruthy()
    })

    test('Should get empty list', async () => {
      const sut = makeSut()
      const note = await sut.getAll(new FakeObjectId().toHexString())
      expect(note.length).toBe(0)
    })
  })

  describe('getById()', () => {
    test('Should get note by id on success', async () => {
      const bank = await new Note(mockCreateNoteParams(faker.datatype.uuid()))
      const res = await bank.save()
      const sut = makeSut()
      const note = await sut.getById(res._id.toHexString(), res.userId)
      expect(note).toBeTruthy()
      expect(note._id).toBeTruthy()
    })

    test('Should return null if note does not exists', async () => {
      const sut = makeSut()
      const note = await sut.getById(new FakeObjectId().toHexString(), new FakeObjectId().toHexString())
      expect(note).toBeFalsy()
    })
  })
})
