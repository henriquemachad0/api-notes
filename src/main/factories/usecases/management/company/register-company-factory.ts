import { RegisterCompany } from '@/domain/usecases/management/company/register-company'
import { CompanyRepository } from '@/infra/db/mongodb/management/company-repository'
import { DbRegisterCompany } from '@/data/usecases/management/company/db-register-company'

export const makeDbRegisterCompany = (): RegisterCompany => {
  const companyMongoRepository = new CompanyRepository()
  return new DbRegisterCompany(companyMongoRepository)
}
