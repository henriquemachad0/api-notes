import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'
import { CreateNote } from '@/domain/usecases/note/create-note'
import { noContent, serverError } from '../../helpers'
import { Controller, HttpResponse } from '../../protocols'

export class CreateNoteController implements Controller {
  constructor (
    private readonly getByIdUser: GetByIdUser,
    private readonly createNote: CreateNote
  ) {}

  async handle (
    request: CreateNoteController.Request
  ): Promise<HttpResponse> {
    try {
      const user = await this.getByIdUser.getById(request.user.id)
      await this.createNote.create({
        ...request
      }, user._id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateNoteController {
  export type Request = CreateNote.Params
}
