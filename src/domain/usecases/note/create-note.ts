import INote from '@/domain/models/types/note/INote'

export interface CreateNote {
  create: (data: CreateNote.Params) => Promise<void>
}

export namespace CreateNote {
  export type Params = Omit<INote, '_id'>
}
