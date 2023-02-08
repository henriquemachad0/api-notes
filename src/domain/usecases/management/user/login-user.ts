import IUser from '@/domain/models/types/management/user/IUser'

export interface LoginUser {
  login: (loginParams: LoginUser.Params) => Promise<LoginUser.Result>
}

export namespace LoginUser {
  export type Params = {
    email: string
    user: IUser
  }

  export type Result = {
    token: string
    user: {
      name: string
      email: string
    }
    refresh_token: string
  }
}
