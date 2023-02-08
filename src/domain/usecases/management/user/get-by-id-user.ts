import IUser from '@/domain/models/types/management/user/IUser'

export interface GetByIdUser {
  getById: (_id: string) => Promise<GetByIdUser.Result>
}

export namespace GetByIdUser {
  export type Result = IUser
}
