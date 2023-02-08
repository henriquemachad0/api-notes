import INote from '@/domain/models/types/note/INote'

export interface GetByIdNote {
  getById: (_id: string) => Promise<GetByIdNote.Result>
}

export namespace GetByIdNote {
  export type Result = INote
}
