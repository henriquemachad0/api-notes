import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, forbidden } from '@/presentation/helpers'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'
import { InvalidParamError } from '@/presentation/errors'

export class GetByIdUserController implements Controller {
  constructor (private readonly getByIdUser: GetByIdUser) {}

  async handle (request: GetByIdUserController.Request): Promise<HttpResponse> {
    try {
      const user = await this.getByIdUser.getById(request._id)
      if (!user) {
        return forbidden(new InvalidParamError('_id'))
      }
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetByIdUserController {
  export type Request = {
    _id: string
  }
}
