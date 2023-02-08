import { ITokenResponse } from '@/domain/models/types/management/user/ITokenResponse'

export interface RefreshTokenUsersTokenRepository {
  refreshToken: (token: string) => Promise<RefreshTokenUsersTokenRepository.Result>
}

export namespace RefreshTokenUsersTokenRepository {
  export type Result = ITokenResponse
}
