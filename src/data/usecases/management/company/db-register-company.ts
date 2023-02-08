import { RegisterCompany } from '@/domain/usecases/management/company/register-company'
import { RegisterCompanyRepository } from '@/data/protocols/db/management/company/register-company-repository'

export class DbRegisterCompany implements RegisterCompany {
  constructor (private readonly createCompanyRepository: RegisterCompanyRepository) {}

  async register (userId: string): Promise<RegisterCompany.Result> {
    return this.createCompanyRepository.register(userId)
  }
}
