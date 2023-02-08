import { RemoveUsersTokens } from '@/domain/usecases/management/users-tokens/remove-users-tokens'
import { RemoveUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/remove-users-tokens-repository'

export class DbRemoveUsersTokens implements RemoveUsersTokens {
  constructor (private readonly removeUsersTokensRepository: RemoveUsersTokensRepository) {}

  async remove (_id: string): Promise<void> {
    return this.removeUsersTokensRepository.remove(_id)
  }
}
