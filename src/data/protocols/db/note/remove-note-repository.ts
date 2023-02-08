export interface RemoveNoteRepository {
  remove: (_id: string) => Promise<void>
}
