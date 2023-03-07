import { makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { GetAllNoteController } from '@/presentation/controllers/note/get-all-note-controller'
import { makeDbGetAllNote } from '@/main/factories/usecases/note/get-all-note-factory'
import { makeDbGetByIdUser } from '../../usecases/management/user/get-by-id-user-factory'

export const makeGetAllNoteController = (): Controller => {
  const controller = new GetAllNoteController(makeDbGetByIdUser(), makeDbGetAllNote())
  return makeLogControllerDecorator(controller)
}
