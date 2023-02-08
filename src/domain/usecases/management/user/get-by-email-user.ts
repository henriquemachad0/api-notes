import IUser from '@/domain/models/types/management/user/IUser'

export interface GetByEmailUser {
  getByEmail: (email: string) => Promise<GetByEmailUser.Result>
}

export namespace GetByEmailUser {
  export type Result = IUser
}
