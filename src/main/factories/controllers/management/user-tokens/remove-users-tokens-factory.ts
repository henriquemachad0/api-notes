import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbRemoveUsersTokens } from '@/main/factories/usecases/management/users-tokens/remove-users-tokens-factory'
import { Controller } from '@/presentation/protocols'
import { RemoveUsersTokensController } from '@/presentation/controllers/management/users-tokens/remove-users-tokens-controller'

export const makeRemoveUsersTokensController = (): Controller => {
  const controller = new RemoveUsersTokensController(makeDbRemoveUsersTokens())
  return makeLogControllerDecorator(controller)
}
