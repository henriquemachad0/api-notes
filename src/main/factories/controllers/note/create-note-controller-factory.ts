import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbCreateNote } from '@/main/factories/usecases/note/create-note-factory'
import { Controller } from '@/presentation/protocols'
import { CreateNoteController } from '@/presentation/controllers/note/create-note-controller'

export const makeCreateNoteController = (): Controller => {
  const controller = new CreateNoteController(makeDbCreateNote())
  return makeLogControllerDecorator(controller)
}
