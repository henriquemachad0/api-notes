import ICompany from '@/domain/models/types/management/company/ICompany'

import faker from 'faker'

export const mockResultCompany = (): ICompany => ({
  _id: faker.datatype.uuid(),
  users: [{ _id: faker.datatype.uuid() }]
})
