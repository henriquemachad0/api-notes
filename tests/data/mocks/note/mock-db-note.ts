import { CreateNoteRepository } from '@/data/protocols/db/note/create-note-repository'
import { GetAllNoteRepository } from '@/data/protocols/db/note/get-all-note-repository'
import { GetByIdNoteRepository } from '@/data/protocols/db/note/get-by-id-note-repository'
import { RemoveNoteRepository } from '@/data/protocols/db/note/remove-note-repository'
import { UpdateNoteRepository } from '@/data/protocols/db/note/update-note-repository'
import { mockNoteModel, mockNoteModels } from '@/tests/domain/mocks/note/mock-note'

export class CreateNoteRepositorySpy
implements CreateNoteRepository {
  params: CreateNoteRepository.Params
  userId: string

  async create (params: CreateNoteRepository.Params, userId: string): Promise<void> {
    this.params = params
    this.userId = userId
  }
}
export class UpdateNoteRepositorySpy
implements UpdateNoteRepository {
  _id: string
  params: UpdateNoteRepository.Params

  async update (params: UpdateNoteRepository.Params, _id: string): Promise<void> {
    this._id = _id
    this.params = params
  }
}
export class RemoveNoteRepositorySpy
implements RemoveNoteRepository {
  _id: string

  async remove (_id: string): Promise<void> {
    this._id = _id
  }
}

export class GetAllNoteRepositorySpy
implements GetAllNoteRepository {
  userId: string
  result = mockNoteModels()

  async getAll (userId: string): Promise<GetAllNoteRepository.Result> {
    this.userId = userId
    return this.result
  }
}
export class GetByIdNoteRepositorySpy
implements GetByIdNoteRepository {
  _id: string
  userId: string
  result = mockNoteModel()

  async getById (_id: string, userId: string): Promise<GetByIdNoteRepository.Result> {
    this._id = _id
    this.userId = userId
    return this.result
  }
}
