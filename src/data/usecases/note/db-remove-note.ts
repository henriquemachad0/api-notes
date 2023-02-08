import { RemoveNote } from '@/domain/usecases/note/remove-note'
import { RemoveNoteRepository } from '@/data/protocols/db/note/remove-note-repository'

export class DbRemoveNote implements RemoveNote {
  constructor (private readonly removeNoteRepository: RemoveNoteRepository) {}

  async remove (_id: string): Promise<void> {
    return this.removeNoteRepository.remove(_id)
  }
}
