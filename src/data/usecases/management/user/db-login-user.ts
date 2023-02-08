import { LoginUser } from '@/domain/usecases/management/user/login-user'
import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'
import { sign } from 'jsonwebtoken'

import auth from '@/main/config/auth'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export class DbLoginUser implements LoginUser {
  constructor (private readonly createUsersTokens: CreateUsersTokens) {}

  async login (dataParams: LoginUser.Params): Promise<LoginUser.Result> {
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    const token = sign({}, secret_token, {
      subject: dataParams.user._id.toString(),
      expiresIn: expires_in_token
    })

    const refresh_token = sign(
      { email: dataParams.email },
      secret_refresh_token,
      {
        subject: dataParams.user._id.toString(),
        expiresIn: expires_in_refresh_token
      }
    )

    const days = dayjs().add(expires_refresh_token_days, 'days').toDate()
    const refresh_token_expires_date = days

    await this.createUsersTokens.create({
      expires_date: refresh_token_expires_date,
      refresh_token: refresh_token,
      user_id: dataParams.user._id
    })

    return {
      token,
      user: {
        name: dataParams.user.name,
        email: dataParams.user.email
      },
      refresh_token
    }
  }
}
