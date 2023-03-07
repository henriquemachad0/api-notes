import { CreateNote } from '@/domain/usecases/note/create-note'

export interface CreateNoteRepository {
  create: (data: CreateNoteRepository.Params, userId: string) => Promise<void>
}

export namespace CreateNoteRepository {
  export type Params = CreateNote.Params
}
