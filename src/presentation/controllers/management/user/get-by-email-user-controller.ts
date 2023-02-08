import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'

export class GetByEmailUserController implements Controller {
  constructor (private readonly getByEmailUser: GetByEmailUser) {}

  async handle (request: GetByEmailUserController.Request): Promise<HttpResponse> {
    try {
      const user = await this.getByEmailUser.getByEmail(request.email)
      return user ? ok(user) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetByEmailUserController {
  export type Request = {
    email: string
  }
}
