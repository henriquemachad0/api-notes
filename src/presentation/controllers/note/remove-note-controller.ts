import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, forbidden,noContent } from '@/presentation/helpers'
import { RemoveNote } from '@/domain/usecases/note/remove-note'
import { InvalidParamError } from '@/presentation/errors'
import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'

export class RemoveNoteController implements Controller {
  constructor (
    private readonly getByIdNote: GetByIdNote,
    private readonly removeNote: RemoveNote
  ) {}

  async handle (request: RemoveNoteController.Request): Promise<HttpResponse> {
    try {
      const note = await this.getByIdNote.getById(request._id)
      if (!note) {
        return forbidden(new InvalidParamError('_id'))
      }
      await this.removeNote.remove(request._id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RemoveNoteController {
  export type Request = {
    _id: string
    user: {
      id: string
      token: string
    }
  }
}
