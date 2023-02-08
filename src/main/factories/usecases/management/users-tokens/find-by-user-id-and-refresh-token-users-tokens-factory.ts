import { FindByUserIdAndRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens'
import { DbFindByUserIdAndRefreshTokenUsersTokens } from '@/data/usecases/management/users-tokens/db-find-by-user-id-and-refresh-token-users-tokens'
import { UsersTokensRepository } from '@/infra/db/mongodb/management/users-tokens-repository'

export const makeDbFindByUserIdAndRefreshTokenUsersTokens = (): FindByUserIdAndRefreshTokenUsersTokens => {
  const userRepository = new UsersTokensRepository()
  return new DbFindByUserIdAndRefreshTokenUsersTokens(userRepository)
}
