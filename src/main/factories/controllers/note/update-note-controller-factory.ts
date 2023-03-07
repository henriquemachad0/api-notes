import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbUpdateNote } from '@/main/factories/usecases/note/update-note-factory'
import { makeDbGetByIdNote } from '@/main/factories/usecases/note/get-by-id-note-factory'
import { Controller } from '@/presentation/protocols'
import { UpdateNoteController } from '@/presentation/controllers/note/update-note-controller'
import { makeDbGetByIdUser } from '../../usecases/management/user/get-by-id-user-factory'

export const makeUpdateNoteController = (): Controller => {
  const controller = new UpdateNoteController(makeDbGetByIdUser(), makeDbGetByIdNote(), makeDbUpdateNote())
  return makeLogControllerDecorator(controller)
}
