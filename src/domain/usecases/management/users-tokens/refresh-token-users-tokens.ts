import { ITokenResponse } from '@/domain/models/types/management/user/ITokenResponse'

export interface RefreshTokenUsersTokens {
  refreshToken: (data: RefreshTokenUsersTokens.Params) => Promise<RefreshTokenUsersTokens.Result>
}

export namespace RefreshTokenUsersTokens {
  export type Params = {
    email: string
    sub: string
    user_id: string
  }

  export type Result = ITokenResponse
}
