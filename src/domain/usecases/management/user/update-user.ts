import IUser from '@/domain/models/types/management/user/IUser'

export interface UpdateUser {
  update: (data: UpdateUser.Params) => Promise<void>
}

export namespace UpdateUser {
  export type Params = {
    user: IUser
    name: string
    email: string
    password: string
  }
}
