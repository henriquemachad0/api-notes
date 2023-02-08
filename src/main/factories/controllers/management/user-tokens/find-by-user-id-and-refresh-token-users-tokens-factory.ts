import { makeLogControllerDecorator} from '@/main/factories'
import { makeDbFindByUserIdAndRefreshTokenUsersTokens } from '@/main/factories/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens-factory'
import { Controller } from '@/presentation/protocols'
import { FindByUserIdAndRefreshTokenUsersTokensController } from '@/presentation/controllers/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens-controller'

export const makeFindByUserIdAndRefreshTokenUsersTokensController = (): Controller => {
  const controller = new FindByUserIdAndRefreshTokenUsersTokensController(makeDbFindByUserIdAndRefreshTokenUsersTokens())
  return makeLogControllerDecorator(controller)
}
