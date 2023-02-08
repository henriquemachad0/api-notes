import UserTokens from '@/domain/models/mongodb/management/user/user-tokens'
import IUserTokens from '@/domain/models/types/management/user/IUserTokens'

import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'
import { FindByUserIdAndRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens'

import { CreateUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/create-users-tokens-repository'
import { RemoveUsersTokens } from '@/domain/usecases/management/users-tokens/remove-users-tokens'
import { FindByRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-refresh-token-users-tokens'

export class UsersTokensRepository
implements
    CreateUsersTokens,
    FindByUserIdAndRefreshTokenUsersTokens,
    RemoveUsersTokens,
    FindByRefreshTokenUsersTokens {
  async create (data: CreateUsersTokensRepository.Params): Promise<IUserTokens> {
    const userToken = new UserTokens({
      expires_date: data.expires_date,
      refresh_token: data.refresh_token,
      user_id: data.user_id
    })

    await userToken.save()

    return userToken as unknown as IUserTokens
  }

  async findByUserIdAndRefreshToken (
    user_id: string,
    refresh_token: string
  ): Promise<IUserTokens> {
    const usersTokens = await UserTokens.findOne({
      user_id,
      refresh_token
    })
    return usersTokens as unknown as IUserTokens
  }

  async remove (_id: string): Promise<void> {
    await UserTokens.findByIdAndRemove(_id)
  }

  async findByRefreshToken (refresh_token: string): Promise<IUserTokens> {
    const userToken = await UserTokens.findOne({ refresh_token })

    return userToken as unknown as IUserTokens
  }
}
