import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'
import { UsersTokensRepository } from '@/infra/db/mongodb/management/users-tokens-repository'
import { DbCreateUsersTokens } from '@/data/usecases/management/users-tokens/db-create-users-tokens'

export const makeDbCreateUsersTokens = (): CreateUsersTokens => {
  const usersTokensMongoRepository = new UsersTokensRepository()
  return new DbCreateUsersTokens(usersTokensMongoRepository)
}
