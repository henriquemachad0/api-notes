import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, noContent } from '@/presentation/helpers'
import { RemoveUsersTokens } from '@/domain/usecases/management/users-tokens/remove-users-tokens'

export class RemoveUsersTokensController implements Controller {
  constructor (
    private readonly removeUsersTokens: RemoveUsersTokens
  ) {}

  async handle (request: RemoveUsersTokensController.Request): Promise<HttpResponse> {
    try {
      await this.removeUsersTokens.remove(request._id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RemoveUsersTokensController {
  export type Request = {
    _id: string
  }
}
