import INote from '@/domain/models/types/note/INote'

export interface GetByIdNoteRepository {
  getById: (_id: string, userId: string) => Promise<GetByIdNoteRepository.Result>
}

export namespace GetByIdNoteRepository {
  export type Result = INote
}
