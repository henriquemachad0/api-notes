import IUser from '@/domain/models/types/management/user/IUser'

export interface GetByEmailUserRepository {
  getByEmail: (email: string) => Promise<GetByEmailUserRepository.Result>
}

export namespace GetByEmailUserRepository {
  export type Result = IUser
}
