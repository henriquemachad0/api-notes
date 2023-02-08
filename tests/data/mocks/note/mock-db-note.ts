import { CreateNoteRepository } from '@/data/protocols/db/note/create-note-repository'
import { GetAllNoteRepository } from '@/data/protocols/db/note/get-all-note-repository'
import { GetByIdNoteRepository } from '@/data/protocols/db/note/get-by-id-note-repository'
import { RemoveNoteRepository } from '@/data/protocols/db/note/remove-note-repository'
import { UpdateNoteRepository } from '@/data/protocols/db/note/update-note-repository'
import { mockNoteModel, mockNoteModels } from '@/tests/domain/mocks/note/mock-note'

export class CreateNoteRepositorySpy
implements CreateNoteRepository {
  params: CreateNoteRepository.Params

  async create (params: CreateNoteRepository.Params): Promise<void> {
    this.params = params
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
  result = mockNoteModels()

  async getAll (): Promise<GetAllNoteRepository.Result> {
    return this.result
  }
}
export class GetByIdNoteRepositorySpy
implements GetByIdNoteRepository {
  _id: string
  result = mockNoteModel()

  async getById (_id: string): Promise<GetByIdNoteRepository.Result> {
    this._id = _id
    return this.result
  }
}
