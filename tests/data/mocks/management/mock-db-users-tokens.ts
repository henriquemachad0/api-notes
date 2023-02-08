import { CreateUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/create-users-tokens-repository'
import { FindByRefreshTokenUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/find-by-refresh-token-users-tokens-repository'
import { FindByUserIdAndRefreshTokenUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens-repository'
import { RemoveUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/remove-users-tokens-repository'
import { mockResultUsersTokens } from '@/tests/domain/mocks/management/mock-users-tokens'

export class CreateUsersTokensRepositorySpy
implements CreateUsersTokensRepository {
  data: CreateUsersTokensRepository.Params
  result = mockResultUsersTokens()

  async create (
    data: CreateUsersTokensRepository.Params
  ): Promise<CreateUsersTokensRepository.Result> {
    this.data = data

    return this.result
  }
}

export class FindByUserIdAndRefreshTokenUsersTokensRepositorySpy
implements FindByUserIdAndRefreshTokenUsersTokensRepository {
  userId: string
  refreshToken: string
  result = mockResultUsersTokens()

  async findByUserIdAndRefreshToken (
    user_id: string,
    refresh_token: string
  ): Promise<CreateUsersTokensRepository.Result> {
    this.userId = user_id
    this.refreshToken = refresh_token

    return this.result
  }
}

export class FindByRefreshTokenUsersTokensRepositorySpy
implements FindByRefreshTokenUsersTokensRepository {
  refreshToken: string
  result = mockResultUsersTokens()

  async findByRefreshToken (
    refresh_token: string
  ): Promise<CreateUsersTokensRepository.Result> {
    this.refreshToken = refresh_token

    return this.result
  }
}

export class RemoveUsersTokensRepositorySpy
implements RemoveUsersTokensRepository {
  _id: string

  async remove (_id: string): Promise<void> {
    this._id = _id
  }
}
