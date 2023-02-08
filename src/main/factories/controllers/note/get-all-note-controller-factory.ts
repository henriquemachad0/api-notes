import { makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { GetAllNoteController } from '@/presentation/controllers/note/get-all-note-controller'
import { makeDbGetAllNote } from '@/main/factories/usecases/note/get-all-note-factory'

export const makeGetAllNoteController = (): Controller => {
  const controller = new GetAllNoteController(makeDbGetAllNote())
  return makeLogControllerDecorator(controller)
}
