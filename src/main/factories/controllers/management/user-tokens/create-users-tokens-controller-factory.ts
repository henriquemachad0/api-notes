import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbCreateUsersTokens } from '@/main/factories/usecases/management/users-tokens/create-users-tokens-factory'
import { Controller } from '@/presentation/protocols'
import { CreateUsersTokensController } from '@/presentation/controllers/management/users-tokens/create-users-tokens-controller'

export const makeCreateUsersTokensController = (): Controller => {
  const controller = new CreateUsersTokensController(makeDbCreateUsersTokens())
  return makeLogControllerDecorator(controller)
}
