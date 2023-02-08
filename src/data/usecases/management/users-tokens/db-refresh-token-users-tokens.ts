import { RefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/refresh-token-users-tokens'
import { CreateUsersTokensRepository } from '@/data/protocols/db/management/users-tokens/create-users-tokens-repository'
import auth from '@/main/config/auth'
import { sign } from 'jsonwebtoken'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export class DbRefreshTokenUsersTokens implements RefreshTokenUsersTokens {
  constructor (
    private readonly createUsersTokens: CreateUsersTokensRepository
  ) {}

  async refreshToken (data: RefreshTokenUsersTokens.Params): Promise<RefreshTokenUsersTokens.Result> {
    const refresh_token = sign({ email: data.email }, auth.secret_refresh_token, {
      subject: data.sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const days = dayjs().add(auth.expires_refresh_token_days, 'days').toDate()

    const expires_date = days

    await this.createUsersTokens.create({
      expires_date,
      refresh_token,
      user_id: data.user_id
    })

    const newToken = sign({}, auth.secret_token, {
      subject: data.user_id,
      expiresIn: auth.expires_in_token
    })

    return { refresh_token, token: newToken }
  }
}
