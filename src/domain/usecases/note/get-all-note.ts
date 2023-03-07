import INote from '@/domain/models/types/note/INote'

export interface GetAllNote {
  getAll: (
    userId: string
  ) => Promise<GetAllNote.Result>
}

export namespace GetAllNote {
  export type Result = INote[]
}
