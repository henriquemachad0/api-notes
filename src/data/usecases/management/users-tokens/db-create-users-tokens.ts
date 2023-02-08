import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'
import { CreateUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/create-users-tokens-repository'

export class DbCreateUsersTokens implements CreateUsersTokens {
  constructor (private readonly createUsersTokensRepository: CreateUsersTokensRepository) {}

  async create (data: CreateUsersTokens.Params): Promise<CreateUsersTokens.Result> {
    return this.createUsersTokensRepository.create(data)
  }
}
