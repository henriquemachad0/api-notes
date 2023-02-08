import { NoteRepository } from '@/infra/db/mongodb/note-repository'
import { GetAllNote } from '@/domain/usecases/note/get-all-note'
import { DbGetAllNote } from '@/data/usecases/note/db-get-all-note'

export const makeDbGetAllNote = (): GetAllNote => {
  const noteMongoRepository = new NoteRepository()
  return new DbGetAllNote(noteMongoRepository)
}
