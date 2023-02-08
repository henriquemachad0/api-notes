import { RegisterUser } from '@/domain/usecases/management/user/register-user'
import { UserRepository } from '@/infra/db/mongodb/management/user-repository'
import { DbRegisterUser } from '@/data/usecases/management/user/db-register-user'

export const makeDbRegisterUser = (): RegisterUser => {
  const userMongoRepository = new UserRepository()
  return new DbRegisterUser(userMongoRepository)
}
