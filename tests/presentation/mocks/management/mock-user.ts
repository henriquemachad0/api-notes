import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'
import { LoginUser } from '@/domain/usecases/management/user/login-user'
import { RegisterUser } from '@/domain/usecases/management/user/register-user'
import { UpdateUser } from '@/domain/usecases/management/user/update-user'
import {
  mockResultGetByEmailUser,
  mockResultLoginUser,
  mockResultUser
} from '@/tests/domain/mocks/management/mock-user'

export class RegisterUserSpy implements RegisterUser {
  name: string
  email: string
  password: string
  result = mockResultUser()

  async register (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterUser.Result> {
    this.name = name
    this.email = email
    this.password = password
    return this.result
  }
}

export class UpdateUserSpy implements UpdateUser {
  data: UpdateUser.Params

  async update (data: UpdateUser.Params): Promise<void> {
    this.data = data
  }
}

export class GetByIdUserSpy implements GetByIdUser {
  _id: string
  result = mockResultUser()

  async getById (_id: string): Promise<GetByIdUser.Result> {
    this._id = _id
    return this.result
  }
}

export class GetByEmailUserSpy implements GetByEmailUser {
  email: string

  result = mockResultGetByEmailUser()

  async getByEmail (email: string): Promise<GetByEmailUser.Result> {
    this.email = email
    return this.result
  }
}

export class LoginUserSpy implements LoginUser {
  loginParams: LoginUser.Params
  result = mockResultLoginUser()

  async login (loginParams: LoginUser.Params): Promise<LoginUser.Result> {
    this.loginParams = loginParams
    return this.result
  }
}
