import { makeLogControllerDecorator} from '@/main/factories'
import { makeDbFindByRefreshTokenUsersTokens } from '@/main/factories/usecases/management/users-tokens/find-by-refresh-token-users-tokens-factory'
import { Controller } from '@/presentation/protocols'
import { FindByRefreshTokenUsersTokensController } from '@/presentation/controllers/management/users-tokens/find-by-refresh-token-users-tokens-controller'

export const makeFindByRefreshTokenUsersTokensController = (): Controller => {
  const controller = new FindByRefreshTokenUsersTokensController(makeDbFindByRefreshTokenUsersTokens())
  return makeLogControllerDecorator(controller)
}
