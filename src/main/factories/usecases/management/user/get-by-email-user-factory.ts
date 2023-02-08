import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'
import { UserRepository } from '@/infra/db/mongodb/management/user-repository'
import { DbGetByEmailUser } from '@/data/usecases/management/user/db-get-by-email-user'

export const makeDbGetByEmailUser = (): GetByEmailUser => {
  const userRepository = new UserRepository()
  return new DbGetByEmailUser(userRepository)
}
