import INote from '@/domain/models/types/note/INote'

export interface UpdateNote {
  update: (data: UpdateNote.Params, _id: string) => Promise<void>
}

export namespace UpdateNote {
  export type Params = INote

}
