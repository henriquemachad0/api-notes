import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { GetAllNote } from '@/domain/usecases/note/get-all-note'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'

export class GetAllNoteController implements Controller {
  constructor (
    private readonly getByIdUser: GetByIdUser,
    private readonly getAllNote: GetAllNote) {}

  async handle (request: GetAllNoteController.Request): Promise<HttpResponse> {
    try {
      const user = await this.getByIdUser.getById(request.user.id)
      const notes = await this.getAllNote.getAll(user._id)
      return notes.length ? ok(notes) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetAllNoteController {
  export type Request = {
    user: {
      id: string
      token: string
    }
  }
}
