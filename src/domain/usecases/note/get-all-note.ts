import INote from '@/domain/models/types/note/INote'

export interface GetAllNote {
  getAll: (
    _id: string,
  ) => Promise<GetAllNote.Result>
}

export namespace GetAllNote {
  export type Result = INote[]
}
