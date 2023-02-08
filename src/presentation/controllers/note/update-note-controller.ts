import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'
import { UpdateNote } from '@/domain/usecases/note/update-note'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '../../helpers'
import { Controller, HttpResponse } from '../../protocols'

export class UpdateNoteController implements Controller {
  constructor (
    private readonly getByIdNote: GetByIdNote,
    private readonly updateNote: UpdateNote) {}

  async handle (
    request: UpdateNoteController.Request
  ): Promise<HttpResponse> {
    try {
      const note = await this.getByIdNote.getById(request._id)
      if (!note) {
        return forbidden(new InvalidParamError('_id'))
      }
      await this.updateNote.update(
        {
          ...request
        },
        request._id
      )

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateNoteController {
  export type Request = UpdateNote.Params
}
