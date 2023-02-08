import IUserTokens from '@/domain/models/types/management/user/IUserTokens'
import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'

export interface CreateUsersTokensRepository {
  create: (data: CreateUsersTokensRepository.Params) => Promise<CreateUsersTokensRepository.Result>
}

export namespace CreateUsersTokensRepository {
  export type Params = CreateUsersTokens.Params
  export type Result = IUserTokens
}
