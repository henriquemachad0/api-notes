import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbRegisterUser } from '@/main/factories/usecases/management/user/register-user-factory'
import { Controller } from '@/presentation/protocols'
import { RegisterUserController } from '@/presentation/controllers/management/user/register-user-controller'
import { makeDbGetByEmailUser } from '@/main/factories/usecases/management/user/get-by-email-user-factory'
import { makeDbRegisterCompany } from '@/main/factories/usecases/management/company/register-company-factory'
import { makeDbUpdateUser } from '@/main/factories/usecases/management/user/update-user-factory'

export const makeRegisterUserController = (): Controller => {
  const controller = new RegisterUserController(makeDbGetByEmailUser(), makeDbRegisterCompany(), makeDbRegisterUser(), makeDbUpdateUser())
  return makeLogControllerDecorator(controller)
}
