import { UpdateUser } from '@/domain/usecases/management/user/update-user'

export interface UpdateUserRepository {
  update: (data: UpdateUserRepository.Params) => Promise<void>
}

export namespace UpdateUserRepository {
  export type Params = UpdateUser.Params
}
