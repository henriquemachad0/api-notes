import { Router } from 'express'

import Note from './note-routes.routes'
import Users from './management/user-routes.routes'

const router = Router()

router.use('/note', Note)
router.use('/users', Users)

export { router }
