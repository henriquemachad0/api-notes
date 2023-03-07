
import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeCreateNoteController } from '../factories/controllers/note/create-note-controller-factory'
import { makeGetAllNoteController } from '../factories/controllers/note/get-all-note-controller-factory'
import { makeGetByIdNoteController } from '../factories/controllers/note/get-by-id-note-factory'
import { makeRemoveNoteController } from '../factories/controllers/note/remove-note-factory'
import { makeUpdateNoteController } from '../factories/controllers/note/update-note-controller-factory'
import { ensureAuthenticated } from '../factories/middlewares/ensure-authenticated'

const router = Router()

router.post('/create', ensureAuthenticated, adaptRoute(makeCreateNoteController()))
router.get('/', ensureAuthenticated, adaptRoute(makeGetAllNoteController()))
router.get('/:_id', ensureAuthenticated, adaptRoute(makeGetByIdNoteController()))
router.patch('/update/:_id', ensureAuthenticated, adaptRoute(makeUpdateNoteController()))
router.delete('/remove/:_id', ensureAuthenticated, adaptRoute(makeRemoveNoteController()))

export default router
