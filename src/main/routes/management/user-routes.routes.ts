
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeRegisterUserController } from '@/main/factories/controllers/management/user/register-user-controller-factory'
import { makeUpdateUserController } from '@/main/factories/controllers/management/user/update-user-controller-factory'
import { makeLoginUserController } from '@/main/factories/controllers/management/user/login-user-controller-factory'
import { makeRefreshTokenUsersTokensController } from '@/main/factories/controllers/management/user-tokens/refresh-token-users-tokens-factory'
import { ensureAuthenticated } from '@/main/factories/middlewares/ensure-authenticated'

const router = Router()

router.post('/register', adaptRoute(makeRegisterUserController()))
router.post('/login', adaptRoute(makeLoginUserController()))
router.post('/refresh-token', adaptRoute(makeRefreshTokenUsersTokensController()))
router.patch('/edit', ensureAuthenticated, adaptRoute(makeUpdateUserController()))

export default router
