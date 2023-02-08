export interface RemoveNote {
  remove: (_id: string) => Promise<void>
}
