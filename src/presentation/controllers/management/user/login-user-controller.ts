import { Controller, HttpResponse } from '@/presentation/protocols'

import { serverError, ok, forbidden } from '@/presentation/helpers'

import { MissingParamError } from '@/presentation/errors'
import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'
import { GenericError } from '@/presentation/errors/generic-error'

import bcryptjs from 'bcryptjs'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { LoginUser } from '@/domain/usecases/management/user/login-user'
dayjs.extend(utc)

export class LoginUserController implements Controller {
  constructor (
    private readonly getByEmailUser: GetByEmailUser,
    private readonly loginUser: LoginUser
  ) {}

  async handle (
    request: LoginUserController.Request
  ): Promise<HttpResponse> {
    try {
      if (!request.email) {
        return forbidden(new MissingParamError('email'))
      }

      const user = await this.getByEmailUser.getByEmail(request.email)
      if (!user) {
        return forbidden(
          new GenericError('There is no user registered with this email')
        )
      }

      if (!request.password) {
        return forbidden(new MissingParamError('password'))
      }

      const checkPassord = await bcryptjs.compare(
        request.password,
        user.password
      )

      if (!checkPassord) {
        return forbidden(new MissingParamError('Invalid password'))
      }

      const loginUserPrams = {
        email: request.email,
        user
      }
      const loginUserModel = await this.loginUser.login(loginUserPrams)

      return ok(loginUserModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginUserController {
  export type Request = {
    email: string
    password: string
  }
}
