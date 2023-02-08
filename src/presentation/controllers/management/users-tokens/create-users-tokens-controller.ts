import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'

export class CreateUsersTokensController implements Controller {
  constructor (private readonly createUsersTokens: CreateUsersTokens) {}

  async handle (request: CreateUsersTokensController.Request): Promise<HttpResponse> {
    try {
      const userToken = await this.createUsersTokens.create(request)
      return userToken ? ok(userToken) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateUsersTokensController {
  export type Request = {
    user_id: string
    expires_date: Date
    refresh_token: string
  }
}
