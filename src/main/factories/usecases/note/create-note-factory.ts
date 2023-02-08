import { CreateNote } from '@/domain/usecases/note/create-note'
import { NoteRepository } from '@/infra/db/mongodb/note-repository'
import { DbCreateNote } from '@/data/usecases/note/db-create-note'

export const makeDbCreateNote = (): CreateNote => {
  const noteMongoRepository = new NoteRepository()
  return new DbCreateNote(noteMongoRepository)
}
