import { UsersTokensRepository } from '@/infra/db/mongodb/management/users-tokens-repository'
import { RemoveUsersTokens } from '@/domain/usecases/management/users-tokens/remove-users-tokens'
import { DbRemoveUsersTokens } from '@/data/usecases/management/users-tokens/db-remove-users-tokens'

export const makeDbRemoveUsersTokens = (): RemoveUsersTokens => {
  const usersTokensRepository = new UsersTokensRepository()
  return new DbRemoveUsersTokens(usersTokensRepository)
}
