import { makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { makeDbGetByEmailUser } from '@/main/factories/usecases/management/user/get-by-email-user-factory'
import { LoginUserController } from '@/presentation/controllers/management/user/login-user-controller'
import { makeDbLoginUser } from '@/main/factories/usecases/management/user/login-user-factory'

export const makeLoginUserController = (): Controller => {
  const controller = new LoginUserController(makeDbGetByEmailUser(), makeDbLoginUser())
  return makeLogControllerDecorator(controller)
}
