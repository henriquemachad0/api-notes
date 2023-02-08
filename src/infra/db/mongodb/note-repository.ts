import { CreateNoteRepository } from '@/data/protocols/db/note/create-note-repository'
import { UpdateNoteRepository } from '@/data/protocols/db/note/update-note-repository'
import { GetAllNoteRepository } from '@/data/protocols/db/note/get-all-note-repository'

import Note from '@/domain/models/mongodb/note'
import INote from '@/domain/models/types/note/INote'

import { GetByIdNote } from '@/domain/usecases/note/get-by-id-note'
import { UpdateNote } from '@/domain/usecases/note/update-note'
import { RemoveNote } from '@/domain/usecases/note/remove-note'

export class NoteRepository
implements
    CreateNoteRepository,
    GetAllNoteRepository,
    GetByIdNote,
    UpdateNote,
    RemoveNote {
  async create (
    data: CreateNoteRepository.Params
  ): Promise<void> {
    const note = new Note({
      note: data.note
    })

    await note.save()
  }

  async update (
    data: UpdateNoteRepository.Params,
    _id: string
  ): Promise<void> {
    await Note.findByIdAndUpdate(_id, data)
  }

  async remove (_id: string): Promise<void> {
    await Note.findByIdAndRemove(_id)
  }

  async getAll (
  ): Promise<INote[]> {
    const notes = await Note.find().sort('-createdAt')
    return notes as INote[]
  }

  async getById (_id: string): Promise<INote> {
    const note = await Note.findOne({
      _id: _id
    })

    return note as unknown as INote
  }
}
