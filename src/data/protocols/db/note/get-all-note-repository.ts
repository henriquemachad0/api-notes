import INote from '@/domain/models/types/note/INote'

export interface GetAllNoteRepository {
  getAll: (userId: string) => Promise<GetAllNoteRepository.Result>
}

export namespace GetAllNoteRepository {
  export type Result = INote[]
}
