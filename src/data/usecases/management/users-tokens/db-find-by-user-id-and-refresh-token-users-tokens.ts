import { FindByUserIdAndRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens'
import { FindByUserIdAndRefreshTokenUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens-repository'

export class DbFindByUserIdAndRefreshTokenUsersTokens
implements FindByUserIdAndRefreshTokenUsersTokens {
  constructor (
    private readonly getByIdServiceRepository: FindByUserIdAndRefreshTokenUsersTokensRepository
  ) {}

  async findByUserIdAndRefreshToken (
    user_id: string,
    refresh_token: string
  ): Promise<FindByUserIdAndRefreshTokenUsersTokens.Result> {
    return this.getByIdServiceRepository.findByUserIdAndRefreshToken(user_id, refresh_token)
  }
}
