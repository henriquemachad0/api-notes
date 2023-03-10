import { CreateNote } from '@/domain/usecases/note/create-note'
import { GetAllNote } from '@/domain/usecases/note/get-all-note'
import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'
import { RemoveNote } from '@/domain/usecases/note/remove-note'
import { UpdateNote } from '@/domain/usecases/note/update-note'
import {
  mockNoteModel,
  mockNoteModels
} from '@/tests/domain/mocks/note/mock-note'

export class CreateNoteSpy implements CreateNote {
  params: CreateNote.Params
  userId: string

  async create (params: CreateNote.Params, userId: string): Promise<void> {
    this.userId = userId
    this.params = params
  }
}
export class UpdateNoteSpy implements UpdateNote {
  _id: string
  params: UpdateNote.Params

  async update (params: UpdateNote.Params, _id: string): Promise<void> {
    this._id = _id
    this.params = params
  }
}

export class RemoveNoteSpy implements RemoveNote {
  _id: string

  async remove (_id: string): Promise<void> {
    this._id = _id
  }
}

export class GetAllNoteSpy implements GetAllNote {
  userId: string
  result = mockNoteModels()

  async getAll (
    userId: string
  ): Promise<GetAllNote.Result> {
    this.userId = userId
    return this.result
  }
}
export class GetByIdNoteSpy implements GetByIdNote {
  _id: string
  userId: string
  result = mockNoteModel()

  async getById (_id: string, userId: string): Promise<GetByIdNote.Result> {
    this._id = _id
    this.userId = userId
    return this.result
  }
}
