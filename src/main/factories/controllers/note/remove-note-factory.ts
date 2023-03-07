import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbRemoveNote } from '@/main/factories/usecases/note/remove-note-factory'
import { makeDbGetByIdNote } from '@/main/factories/usecases/note/get-by-id-note-factory'
import { Controller } from '@/presentation/protocols'
import { RemoveNoteController } from '@/presentation/controllers/note/remove-note-controller'
import { makeDbGetByIdUser } from '../../usecases/management/user/get-by-id-user-factory'

export const makeRemoveNoteController = (): Controller => {
  const controller = new RemoveNoteController(makeDbGetByIdUser(), makeDbGetByIdNote(),makeDbRemoveNote())
  return makeLogControllerDecorator(controller)
}
