import { GetAllNote } from '@/domain/usecases/note/get-all-note'
import { GetAllNoteRepository } from '@/data/protocols/db/note/get-all-note-repository'

export class DbGetAllNote implements GetAllNote {
  constructor (private readonly getAllNoteRepository: GetAllNoteRepository) {}

  async getAll (userId: string): Promise<GetAllNote.Result> {
    return this.getAllNoteRepository.getAll(userId)
  }
}
