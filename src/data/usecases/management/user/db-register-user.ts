import { RegisterUser } from '@/domain/usecases/management/user/register-user'
import { RegisterUserRepository } from '@/data/protocols/db/management/user/register-user-repository'

export class DbRegisterUser implements RegisterUser {
  constructor (private readonly registerUserRepository: RegisterUserRepository) {}

  async register (name: string, email: string, password: string): Promise<RegisterUser.Result> {
    return this.registerUserRepository.register(name, email, password)
  }
}
