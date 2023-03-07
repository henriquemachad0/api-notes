import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbCreateNote } from '@/main/factories/usecases/note/create-note-factory'
import { Controller } from '@/presentation/protocols'
import { CreateNoteController } from '@/presentation/controllers/note/create-note-controller'
import { makeDbGetByIdUser } from '../../usecases/management/user/get-by-id-user-factory'

export const makeCreateNoteController = (): Controller => {
  const controller = new CreateNoteController(makeDbGetByIdUser(), makeDbCreateNote())
  return makeLogControllerDecorator(controller)
}
