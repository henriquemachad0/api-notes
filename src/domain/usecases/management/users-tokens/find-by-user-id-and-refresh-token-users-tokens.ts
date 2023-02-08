import IUserTokens from '@/domain/models/types/management/user/IUserTokens'

export interface FindByUserIdAndRefreshTokenUsersTokens {
  findByUserIdAndRefreshToken: (user_id: string,
    refresh_token: string) => Promise<FindByUserIdAndRefreshTokenUsersTokens.Result>
}

export namespace FindByUserIdAndRefreshTokenUsersTokens {
  export type Result = IUserTokens
}
