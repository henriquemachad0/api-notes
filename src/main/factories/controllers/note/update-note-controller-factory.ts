import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbUpdateNote } from '@/main/factories/usecases/note/update-note-factory'
import { makeDbGetByIdNote } from '@/main/factories/usecases/note/get-by-id-note-factory'
import { Controller } from '@/presentation/protocols'
import { UpdateNoteController } from '@/presentation/controllers/note/update-note-controller'

export const makeUpdateNoteController = (): Controller => {
  const controller = new UpdateNoteController(makeDbGetByIdNote(), makeDbUpdateNote())
  return makeLogControllerDecorator(controller)
}
