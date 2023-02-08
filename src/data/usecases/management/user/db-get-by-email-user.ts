import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'
import { GetByEmailUserRepository } from '@/data/protocols/db/management/user/get-by-email-user-repository'

export class DbGetByEmailUser implements GetByEmailUser {
  constructor (private readonly getByEmailUserRepository: GetByEmailUserRepository) {}

  async getByEmail (email: string): Promise<GetByEmailUser.Result> {
    return this.getByEmailUserRepository.getByEmail(email)
  }
}
