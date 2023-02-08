import { UpdateNote } from '@/domain/usecases/note/update-note'
import { NoteRepository } from '@/infra/db/mongodb/note-repository'
import { DbUpdateNote } from '@/data/usecases/note/db-update-note'

export const makeDbUpdateNote = (): UpdateNote => {
  const noteRepository = new NoteRepository()
  return new DbUpdateNote(noteRepository)
}
