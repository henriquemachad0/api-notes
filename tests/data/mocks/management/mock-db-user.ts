import { GetByEmailUserRepository } from '@/data/protocols/db/management/user/get-by-email-user-repository'
import { RegisterUserRepository } from '@/data/protocols/db/management/user/register-user-repository'
import { mockResultGetByEmailUser, mockResultUser } from '@/tests/domain/mocks/management/mock-user'

export class RegisterUserRepositorySpy
implements RegisterUserRepository {
  name: string
  email: string
  password: string
  result = mockResultUser()

  async register (name: string, email: string, password: string): Promise<RegisterUserRepository.Result> {
    this.name = name
    this.email = email
    this.password = password
    return this.result
  }
}
export class GetByEmailUserRepositorySpy
implements GetByEmailUserRepository {
  email: string
  result = mockResultGetByEmailUser()

  async getByEmail (email: string): Promise<GetByEmailUserRepository.Result> {
    this.email = email

    return this.result
  }
}
