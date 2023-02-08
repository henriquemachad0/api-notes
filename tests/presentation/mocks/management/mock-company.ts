import { RegisterCompany } from "@/domain/usecases/management/company/register-company";
import { mockResultCompany } from "@/tests/domain/mocks/management/mock-company";

import faker from "faker";


export class RegisterCompanySpy implements RegisterCompany {
  userId: string;
  result = mockResultCompany();

  async register(userId: string): Promise<RegisterCompany.Result> {
    this.userId = userId;

    return this.result;
  }
}


