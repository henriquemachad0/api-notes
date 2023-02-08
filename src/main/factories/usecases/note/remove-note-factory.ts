import { NoteRepository } from '@/infra/db/mongodb/note-repository'
import { RemoveNote } from '@/domain/usecases/note/remove-note'
import { DbRemoveNote } from '@/data/usecases/note/db-remove-note'

export const makeDbRemoveNote = (): RemoveNote => {
  const noteRepository = new NoteRepository()
  return new DbRemoveNote(noteRepository)
}
