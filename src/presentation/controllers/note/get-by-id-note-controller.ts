import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, forbidden } from '@/presentation/helpers'
import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'
import { InvalidParamError } from '@/presentation/errors'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'

export class GetByIdNoteController implements Controller {
  constructor (
    private readonly getByIdUser: GetByIdUser,
    private readonly getByIdNote: GetByIdNote
  ) {}

  async handle (
    request: GetByIdNoteController.Request
  ): Promise<HttpResponse> {
    try {
      const user = await this.getByIdUser.getById(request.user.id)
      const note = await this.getByIdNote.getById(
        request._id, user._id
      )
      if (!note) {
        return forbidden(new InvalidParamError('_id'))
      }
      return ok(note)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetByIdNoteController {
  export type Request = {
    _id: string
    user: {
      id: string
      token: string
    }
  }
}
