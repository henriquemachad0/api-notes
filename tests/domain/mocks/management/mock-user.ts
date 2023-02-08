import IUser from '@/domain/models/types/management/user/IUser'
import { LoginUser } from '@/domain/usecases/management/user/login-user'
import faker from 'faker'

export const mockResultUser = (): IUser => ({
  _id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: 'teste@gmail.com',
  password: faker.internet.password(),
  companyId: faker.datatype.uuid()
})

export const mockResultLoginUser = (): LoginUser.Result => ({
  token: faker.datatype.uuid(),
  user: {
    name: faker.name.findName(),
    email: faker.internet.email()
  },
  refresh_token: faker.datatype.uuid()
})

export const mockLoginUserParams = (): LoginUser.Params => ({
  email: faker.internet.email(),
  user: mockResultUser()
})

export const mockResultGetByEmailUser = (): IUser => ({
  _id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: 'teste@gmail.com',
  password: '123',
  companyId: faker.datatype.uuid()
})
