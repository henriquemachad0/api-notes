import { FindByRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-refresh-token-users-tokens'
import { FindByRefreshTokenUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/find-by-refresh-token-users-tokens-repository'

export class DbFindByRefreshTokenUsersTokens
implements FindByRefreshTokenUsersTokens {
  constructor (
    private readonly getByIdServiceRepository: FindByRefreshTokenUsersTokensRepository
  ) {}

  async findByRefreshToken (
    refresh_token: string
  ): Promise<FindByRefreshTokenUsersTokens.Result> {
    return this.getByIdServiceRepository.findByRefreshToken(refresh_token)
  }
}
