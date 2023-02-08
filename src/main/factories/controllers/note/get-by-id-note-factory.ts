import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbGetByIdNote } from '@/main/factories/usecases/note/get-by-id-note-factory'
import { Controller } from '@/presentation/protocols'
import { GetByIdNoteController } from '@/presentation/controllers/note/get-by-id-note-controller'

export const makeGetByIdNoteController = (): Controller => {
  const controller = new GetByIdNoteController(makeDbGetByIdNote())
  return makeLogControllerDecorator(controller)
}
