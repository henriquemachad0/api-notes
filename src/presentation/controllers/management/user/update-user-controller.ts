import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'
import { UpdateUser } from '@/domain/usecases/management/user/update-user'
import { EmailInUseError, InvalidParamError } from '@/presentation/errors'
import { DifferentPasswordsError } from '@/presentation/errors/different-passwords-error'
import { forbidden, noContent, serverError } from '../../../helpers'
import { Controller, HttpResponse } from '../../../protocols'

export class UpdateUserController implements Controller {
  constructor (
    private readonly getByIdUser: GetByIdUser,
    private readonly getByEmailUser: GetByEmailUser,
    private readonly updateUser: UpdateUser
  ) {}

  async handle (request: UpdateUserController.Request): Promise<HttpResponse> {
    try {
      const user = await this.getByIdUser.getById(request.user.id)

      if (!user) {
        return forbidden(new InvalidParamError('userId'))
      }

      const requestUpdate = {
        user: user,
        name: request.name,
        email: request.email,
        password: request.password
      }

      const userExists = await this.getByEmailUser.getByEmail(request.email)
      if (user.email !== request.email && userExists) {
        return forbidden(new EmailInUseError())
      }

      if (request.password !== request.confirmPassword) {
        return forbidden(new DifferentPasswordsError())
      }

      await this.updateUser.update({
        ...requestUpdate
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateUserController {
  export type Request = {
    name: string
    email: string
    password: string
    confirmPassword: string
    user: {
      id: string
    }
    userId: string
  }
}
