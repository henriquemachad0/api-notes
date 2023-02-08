import IUser from '@/domain/models/types/management/user/IUser'

export interface GetByIdUserRepository {
  getById: (_id: string) => Promise<GetByIdUserRepository.Result>
}

export namespace GetByIdUserRepository {
  export type Result = IUser
}
