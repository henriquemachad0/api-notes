import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, forbidden } from '@/presentation/helpers'
import { FindByUserIdAndRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens'
import { RemoveUsersTokens } from '@/domain/usecases/management/users-tokens/remove-users-tokens'
import { verify } from 'jsonwebtoken'
import auth from '@/main/config/auth'
import { IPayload } from '@/domain/models/types/management/user/IPayLoad'
import { GenericError } from '@/presentation/errors/generic-error'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { RefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/refresh-token-users-tokens'
dayjs.extend(utc)

export class RefreshTokenUsersTokensController implements Controller {
  constructor (
    private readonly findByUserIdAndRefreshTokenUsersTokens: FindByUserIdAndRefreshTokenUsersTokens,
    private readonly removeUsersTokens: RemoveUsersTokens,
    private readonly refreshTokensUsersTokens: RefreshTokenUsersTokens
  ) {}

  async handle (
    request: RefreshTokenUsersTokensController.Request
  ): Promise<HttpResponse> {
    try {
      const { email, sub } = verify(
        request.token,
        auth.secret_refresh_token
      ) as IPayload

      const user_id = sub

      const userToken =
        await this.findByUserIdAndRefreshTokenUsersTokens.findByUserIdAndRefreshToken(
          user_id,
          request.token
        )
      if (!userToken) {
        return forbidden(new GenericError('Refresh Token does not exists'))
      }

      await this.removeUsersTokens.remove(userToken._id)

      const dataRefreshTokensUsersTokens = {
        email,
        sub,
        user_id
      }
      const refreshTokensUsersTokensModel =
        await this.refreshTokensUsersTokens.refreshToken(
          dataRefreshTokensUsersTokens
        )

      return ok(refreshTokensUsersTokensModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RefreshTokenUsersTokensController {
  export type Request = {
    token: string
  }
}
