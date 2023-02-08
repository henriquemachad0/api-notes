import { ITokenResponse } from '@/domain/models/types/management/user/ITokenResponse'
import IUserTokens from '@/domain/models/types/management/user/IUserTokens'
import { CreateUsersTokens } from '@/domain/usecases/management/users-tokens/create-users-tokens'
import { RefreshTokenUsersTokens } from '@/domain/usecases/management/users-tokens/refresh-token-users-tokens'
import faker from 'faker'

export const mockResultUsersTokens = (): IUserTokens => ({
  _id: faker.datatype.uuid(),
  refresh_token: faker.datatype.uuid(),
  user_id: faker.datatype.uuid(),
  expires_date: faker.date.future()
})

export const mockCreateUsersTokens = (): CreateUsersTokens.Params => ({
  refresh_token: faker.datatype.uuid(),
  user_id: faker.datatype.uuid(),
  expires_date: faker.date.future()
})

export const mockRefreshTokenUsersTokens = (): RefreshTokenUsersTokens.Params => ({
  email: faker.internet.email(),
  sub: faker.datatype.uuid(),
  user_id: faker.datatype.uuid()
})

export const mockResultRefreshTokenUsersTokens = (): ITokenResponse => ({
  token: faker.datatype.uuid(),
  refresh_token: faker.datatype.uuid()
})
