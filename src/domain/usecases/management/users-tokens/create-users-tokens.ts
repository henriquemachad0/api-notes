import IUserTokens from '@/domain/models/types/management/user/IUserTokens'

export interface CreateUsersTokens {
  create: (data: CreateUsersTokens.Params) => Promise<IUserTokens>
}

export namespace CreateUsersTokens {
  export type Params = {
    user_id: string
    expires_date: Date
    refresh_token: string
  }
  export type Result = IUserTokens
}
