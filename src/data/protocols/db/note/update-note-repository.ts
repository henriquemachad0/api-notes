import { UpdateNote } from '@/domain/usecases/note/update-note'

export interface UpdateNoteRepository {
  update: (data: UpdateNoteRepository.Params, _id: string) => Promise<void>
}

export namespace UpdateNoteRepository {
  export type Params = UpdateNote.Params
}
