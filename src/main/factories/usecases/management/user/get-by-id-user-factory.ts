import { UserRepository } from '@/infra/db/mongodb/management/user-repository'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'
import { DbGetByIdUser } from '@/data/usecases/management/user/db-get-by-id-user'

export const makeDbGetByIdUser = (): GetByIdUser => {
  const userRepository = new UserRepository()
  return new DbGetByIdUser(userRepository)
}
