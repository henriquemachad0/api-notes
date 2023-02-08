import { CreateNote } from '@/domain/usecases/note/create-note'
import { noContent, serverError } from '../../helpers'
import { Controller, HttpResponse } from '../../protocols'

export class CreateNoteController implements Controller {
  constructor (
    private readonly createNote: CreateNote
  ) {}

  async handle (
    request: CreateNoteController.Request
  ): Promise<HttpResponse> {
    try {
      await this.createNote.create({
        ...request
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateNoteController {
  export type Request = CreateNote.Params
}
