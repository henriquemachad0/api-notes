import { UpdateUser } from '@/domain/usecases/management/user/update-user'
import { UserRepository } from '@/infra/db/mongodb/management/user-repository'
import { DbUpdateUser } from '@/data/usecases/management/user/db-update-user'

export const makeDbUpdateUser = (): UpdateUser => {
  const bankAccountRepository = new UserRepository()
  return new DbUpdateUser(bankAccountRepository)
}
