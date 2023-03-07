import { CreateNote } from '@/domain/usecases/note/create-note'
import { CreateNoteRepository } from '@/data/protocols/db/note/create-note-repository'

export class DbCreateNote implements CreateNote {
  constructor (private readonly createNoteRepository: CreateNoteRepository) {}

  async create (data: CreateNote.Params, userId: string): Promise<void> {
    await this.createNoteRepository.create(data, userId)
  }
}
