import ICompany from '@/domain/models/types/management/company/ICompany'

export interface RegisterCompany {
  register: (userId: string) => Promise<RegisterCompany.Result>
}

export namespace RegisterCompany {
  export type Result = ICompany
}
