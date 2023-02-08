import Company from '@/domain/models/mongodb/management/company/company'
import ICompany from '@/domain/models/types/management/company/ICompany'

import { RegisterCompany } from '@/domain/usecases/management/company/register-company'

export class CompanyRepository implements RegisterCompany {
  async register (userId: string): Promise<ICompany> {
    // create a company
    const company = new Company({
      users: [
        {
          _id: userId
        }
      ]
    })

    const companyResponse = await company.save()
    return companyResponse as unknown as ICompany
  }
}
