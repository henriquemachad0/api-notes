import { RefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/refresh-token-users-tokens'
import { UsersTokensRepository } from '@/infra/db/mongodb/management/users-tokens-repository'
import { DbRefreshTokenUsersTokens } from '@/data/usecases/management/users-tokens/db-refresh-token-users-tokens'

export const makeDbRefreshTokenUsersTokens = (): RefreshTokenUsersTokens => {
  const usersTokensMongoRepository = new UsersTokensRepository()
  return new DbRefreshTokenUsersTokens(usersTokensMongoRepository)
}
