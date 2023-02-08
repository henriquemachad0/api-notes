import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'
import { GetByIdNoteRepository } from '@/data/protocols/db/note/get-by-id-note-repository'

export class DbGetByIdNote implements GetByIdNote {
  constructor (private readonly getAllBanksAccountRepository: GetByIdNoteRepository) {}

  async getById (_id: string): Promise<GetByIdNote.Result> {
    return this.getAllBanksAccountRepository.getById(_id)
  }
}
