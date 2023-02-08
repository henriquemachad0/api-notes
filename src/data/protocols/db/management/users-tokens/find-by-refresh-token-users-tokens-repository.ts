import IUserTokens from '@/domain/models/types/management/user/IUserTokens'

export interface FindByRefreshTokenUsersTokensRepository {
  findByRefreshToken: (
    refresh_token: string
  ) => Promise<FindByRefreshTokenUsersTokensRepository.Result>
}

export namespace FindByRefreshTokenUsersTokensRepository {
  export type Result = IUserTokens
}
