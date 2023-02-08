import { RegisterCompany } from '@/domain/usecases/management/company/register-company'
import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'
import { RegisterUser } from '@/domain/usecases/management/user/register-user'
import { UpdateUser } from '@/domain/usecases/management/user/update-user'
import { EmailInUseError, MissingParamError } from '@/presentation/errors'
import { DifferentPasswordsError } from '@/presentation/errors/different-passwords-error'
import { forbidden, noContent, serverError } from '../../../helpers'
import { Controller, HttpResponse } from '../../../protocols'

export class RegisterUserController implements Controller {
  constructor (
    private readonly getByEmail: GetByEmailUser,
    private readonly registerCompany: RegisterCompany,
    private readonly registerUser: RegisterUser,
    private readonly updateUser: UpdateUser
  ) {}

  async handle (request: RegisterUserController.Request): Promise<HttpResponse> {
    try {
      if (!request.email) {
        return forbidden(new MissingParamError('email'))
      }
      if (!request.password) {
        return forbidden(new MissingParamError('password'))
      }
      if (!request.confirmPassword) {
        return forbidden(new MissingParamError('confirmPassword'))
      }

      if (request.password !== request.confirmPassword) {
        return forbidden(new DifferentPasswordsError())
      }

      // check if user exists
      const getByEmail = await this.getByEmail.getByEmail(request.email)
      if (getByEmail) {
        return forbidden(new EmailInUseError())
      }

      const user = await this.registerUser.register(
        request.name,
        request.email,
        request.password
      )

      const company = await this.registerCompany.register(user._id)
      user.companyId = company._id

      const requestUpdate = {
        user: user,
        name: request.name,
        email: request.email,
        password: request.password
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

export namespace RegisterUserController {
  export type Request = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
}
