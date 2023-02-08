import ICompany from '@/domain/models/types/management/company/ICompany'

export interface RegisterCompanyRepository {
  register: (userId: string) => Promise<RegisterCompanyRepository.Result>
}

export namespace RegisterCompanyRepository {
  export type Result = ICompany
}
