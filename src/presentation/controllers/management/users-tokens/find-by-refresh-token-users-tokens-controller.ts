import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, noContent } from '@/presentation/helpers'
import { FindByRefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/find-by-refresh-token-users-tokens'

export class FindByRefreshTokenUsersTokensController
implements Controller {
  constructor (
    private readonly findByRefreshTokenUsersTokens: FindByRefreshTokenUsersTokens
  ) {}

  async handle (
    request: FindByRefreshTokenUsersTokensController.Request
  ): Promise<HttpResponse> {
    try {
      const user =
        await this.findByRefreshTokenUsersTokens.findByRefreshToken(request.refresh_token)
      return user ? ok(user) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindByRefreshTokenUsersTokensController {
  export type Request = {
    refresh_token: string
  }
}
