import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbGetByEmailUser } from '@/main/factories/usecases/management/user/get-by-email-user-factory'
import { Controller } from '@/presentation/protocols'
import { GetByEmailUserController } from '@/presentation/controllers/management/user/get-by-email-user-controller'

export const makeGetByEmailUserController = (): Controller => {
  const controller = new GetByEmailUserController(makeDbGetByEmailUser())
  return makeLogControllerDecorator(controller)
}
