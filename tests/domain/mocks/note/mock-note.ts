import INote from '@/domain/models/types/note/INote'
import { CreateNote } from '@/domain/usecases/note/create-note'
import { UpdateNote } from '@/domain/usecases/note/update-note'

import faker from 'faker'

export const mockCreateNoteParams = (userId: string): CreateNote.Params => ({
  userId: userId,
  note: faker.name.findName()
})

export const mockUpdateNoteParams = (): UpdateNote.Params => ({
  note: faker.name.findName()
})

export const mockNoteModel = (): INote => ({
  _id: faker.datatype.uuid(),
  note: faker.name.findName()
})

export const mockNoteModels = (): INote[] => [
  mockNoteModel(),
  mockNoteModel()
]
