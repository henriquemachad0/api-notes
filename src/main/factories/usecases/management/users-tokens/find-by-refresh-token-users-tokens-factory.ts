import { FindByRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-refresh-token-users-tokens'
import { DbFindByRefreshTokenUsersTokens } from '@/data/usecases/management/users-tokens/db-find-by-refresh-token-users-tokens'
import { UsersTokensRepository } from '@/infra/db/mongodb/management/users-tokens-repository'

export const makeDbFindByRefreshTokenUsersTokens = (): FindByRefreshTokenUsersTokens => {
  const userRepository = new UsersTokensRepository()
  return new DbFindByRefreshTokenUsersTokens(userRepository)
}
