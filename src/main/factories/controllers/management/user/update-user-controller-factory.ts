import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbUpdateUser } from '@/main/factories/usecases/management/user/update-user-factory'
import { makeDbGetByIdUser } from '@/main/factories/usecases/management/user/get-by-id-user-factory'
import { Controller } from '@/presentation/protocols'
import { UpdateUserController } from '@/presentation/controllers/management/user/update-user-controller'
import { makeDbGetByEmailUser } from '@/main/factories/usecases/management/user/get-by-email-user-factory'

export const makeUpdateUserController = (): Controller => {
  const controller = new UpdateUserController(makeDbGetByIdUser(), makeDbGetByEmailUser(), makeDbUpdateUser())
  return makeLogControllerDecorator(controller)
}
