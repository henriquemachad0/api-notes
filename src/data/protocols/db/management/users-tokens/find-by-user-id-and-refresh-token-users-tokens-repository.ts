import IUserTokens from '@/domain/models/types/management/user/IUserTokens'

export interface FindByUserIdAndRefreshTokenUsersTokensRepository {
  findByUserIdAndRefreshToken: (
    user_id: string,
    refresh_token: string
  ) => Promise<FindByUserIdAndRefreshTokenUsersTokensRepository.Result>
}

export namespace FindByUserIdAndRefreshTokenUsersTokensRepository {
  export type Result = IUserTokens
}
