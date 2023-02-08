import IUser from '@/domain/models/types/management/user/IUser'

export interface RegisterUser {
  register: (name: string, email: string, password: string) => Promise<RegisterUser.Result>
}

export namespace RegisterUser {
  export type Result = IUser
}
