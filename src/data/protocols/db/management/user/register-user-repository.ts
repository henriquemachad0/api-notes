import IUser from '@/domain/models/types/management/user/IUser'

export interface RegisterUserRepository {
  register: (name: string, email: string, password: string) => Promise<RegisterUserRepository.Result>
}

export namespace RegisterUserRepository {
  export type Result = IUser
}
