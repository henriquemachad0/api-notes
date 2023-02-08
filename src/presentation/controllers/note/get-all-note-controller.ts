import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { GetAllNote } from '@/domain/usecases/note/get-all-note'

export class GetAllNoteController implements Controller {
  constructor (
    private readonly getAllNote: GetAllNote) {}

  async handle (request: GetAllNoteController.Request): Promise<HttpResponse> {
    try {
      const notes = await this.getAllNote.getAll(request._id)
      return notes.length ? ok(notes) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetAllNoteController {
  export type Request = {
    _id: string
    status: boolean
    user: {
      id: string
      token: string
    }
  }
}
