import { RegisterCompanyRepository } from '@/data/protocols/db/management/company/register-company-repository'
import { mockResultCompany } from '@/tests/domain/mocks/management/mock-company'

export class RegisterCompanyRepositorySpy
implements RegisterCompanyRepository {
  userId: string
  result = mockResultCompany()

  async register (userId: string): Promise<RegisterCompanyRepository.Result> {
    this.userId = userId
    return this.result
  }
}
