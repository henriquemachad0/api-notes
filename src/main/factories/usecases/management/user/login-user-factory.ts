import { DbLoginUser } from '@/data/usecases/management/user/db-login-user'
import { LoginUser } from '@/domain/usecases/management/user/login-user'
import { makeDbCreateUsersTokens } from '../users-tokens/create-users-tokens-factory'

export const makeDbLoginUser = (): LoginUser => {
  const createUsersTokens = makeDbCreateUsersTokens()
  return new DbLoginUser(createUsersTokens)
}
