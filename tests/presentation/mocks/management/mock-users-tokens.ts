import { ITokenResponse } from '@/domain/models/types/management/user/ITokenResponse'
import IUserTokens from '@/domain/models/types/management/user/IUserTokens'
import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'
import { FindByUserIdAndRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens'
import { RefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/refresh-token-users-tokens'
import { RemoveUsersTokens } from '@/domain/usecases/management/users-tokens/remove-users-tokens'
import {
  mockResultRefreshTokenUsersTokens,
  mockResultUsersTokens
} from '@/tests/domain/mocks/management/mock-users-tokens'

export class CreateUsersTokensSpy implements CreateUsersTokens {
  data: CreateUsersTokens.Params

  result = mockResultUsersTokens()

  async create (data: CreateUsersTokens.Params): Promise<IUserTokens> {
    this.data = data

    return this.result
  }
}
export class RefreshTokenUsersTokensSpy implements RefreshTokenUsersTokens {
  data: RefreshTokenUsersTokens.Params

  result = mockResultRefreshTokenUsersTokens()

  async refreshToken (
    data: RefreshTokenUsersTokens.Params
  ): Promise<ITokenResponse> {
    this.data = data

    return this.result
  }
}
export class FindByUserIdAndRefreshTokenUsersTokensSpy
implements FindByUserIdAndRefreshTokenUsersTokens {
  user_id: string
  refresh_token: string

  result = mockResultUsersTokens()

  async findByUserIdAndRefreshToken (
    user_id: string,
    refresh_token: string
  ): Promise<IUserTokens> {
    this.user_id = user_id
    this.refresh_token = refresh_token

    return this.result
  }
}

export class RemoveUsersTokensSpy implements RemoveUsersTokens {
  _id: string

  async remove (_id: string): Promise<void> {
    this._id = _id
  }
}
