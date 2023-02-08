import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'
import { GetByIdUserRepository } from '@/data/protocols/db/management/user/get-by-id-user-repository'

export class DbGetByIdUser implements GetByIdUser {
  constructor (private readonly getByIdUserRepository: GetByIdUserRepository) {}

  async getById (_id: string): Promise<GetByIdUser.Result> {
    return this.getByIdUserRepository.getById(_id)
  }
}
