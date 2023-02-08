import { UpdateNote } from '@/domain/usecases/note/update-note'
import { UpdateNoteRepository } from '@/data/protocols/db/note/update-note-repository'

export class DbUpdateNote implements UpdateNote {
  constructor (private readonly updateNoteRepository: UpdateNoteRepository) {}

  async update (data: UpdateNote.Params, _id: string): Promise<void> {
    await this.updateNoteRepository.update(data, _id)
  }
}
