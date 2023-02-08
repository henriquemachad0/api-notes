import { makeLogControllerDecorator} from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { RefreshTokenUsersTokensController } from '@/presentation/controllers/management/users-tokens/refresh-token-users-tokens-controller'
import { makeDbFindByUserIdAndRefreshTokenUsersTokens } from '@/main/factories/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens-factory'
import { makeDbRemoveUsersTokens } from '@/main/factories/usecases/management/users-tokens/remove-users-tokens-factory'
import { makeDbRefreshTokenUsersTokens } from '@/main/factories/usecases/management/users-tokens/refesh-users-tokens-factory'

export const makeRefreshTokenUsersTokensController = (): Controller => {
  const controller = new RefreshTokenUsersTokensController(makeDbFindByUserIdAndRefreshTokenUsersTokens(), makeDbRemoveUsersTokens(), makeDbRefreshTokenUsersTokens())
  return makeLogControllerDecorator(controller)
}
