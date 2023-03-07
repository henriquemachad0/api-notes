import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, forbidden,noContent } from '@/presentation/helpers'
import { RemoveNote } from '@/domain/usecases/note/remove-note'
import { InvalidParamError } from '@/presentation/errors'
import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'

export class RemoveNoteController implements Controller {
  constructor (
    private readonly getByIdUser: GetByIdUser,
    private readonly getByIdNote: GetByIdNote,
    private readonly removeNote: RemoveNote
  ) {}

  async handle (request: RemoveNoteController.Request): Promise<HttpResponse> {
    try {
      const user = await this.getByIdUser.getById(request.user.id)
      const note = await this.getByIdNote.getById(request._id, user._id)
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
