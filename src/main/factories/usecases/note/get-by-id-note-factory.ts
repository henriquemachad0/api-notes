import { NoteRepository } from '@/infra/db/mongodb/note-repository'
import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'
import { DbGetByIdNote } from '@/data/usecases/note/db-get-by-id-note'

export const makeDbGetByIdNote = (): GetByIdNote => {
  const noteRepository = new NoteRepository()
  return new DbGetByIdNote(noteRepository)
}
