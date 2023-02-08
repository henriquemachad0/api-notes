export interface RemoveUsersTokensRepository {
  remove: (_id: string) => Promise<void>
}
