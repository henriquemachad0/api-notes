import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbRemoveNote } from '@/main/factories/usecases/note/remove-note-factory'
import { makeDbGetByIdNote } from '@/main/factories/usecases/note/get-by-id-note-factory'
import { Controller } from '@/presentation/protocols'
import { RemoveNoteController } from '@/presentation/controllers/note/remove-note-controller'

export const makeRemoveNoteController = (): Controller => {
  const controller = new RemoveNoteController(makeDbGetByIdNote(),makeDbRemoveNote())
  return makeLogControllerDecorator(controller)
}
