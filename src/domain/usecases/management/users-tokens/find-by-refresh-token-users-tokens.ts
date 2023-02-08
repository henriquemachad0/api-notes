import IUserTokens from '@/domain/models/types/management/user/IUserTokens'

export interface FindByRefreshTokenUsersTokens {
  findByRefreshToken: (
    refresh_token: string
  ) => Promise<FindByRefreshTokenUsersTokens.Result>
}

export namespace FindByRefreshTokenUsersTokens {
  export type Result = IUserTokens
}
