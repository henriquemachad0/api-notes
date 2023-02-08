import { UpdateUser } from '@/domain/usecases/management/user/update-user'
import { UpdateUserRepository } from '@/data/protocols/db/management/user/update-user-repository'

export class DbUpdateUser implements UpdateUser {
  constructor (private readonly updateUserRepository: UpdateUserRepository) {}

  async update (data: UpdateUser.Params): Promise<void> {
    await this.updateUserRepository.update(data)
  }
}
