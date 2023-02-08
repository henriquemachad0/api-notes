import mongoose from '@/domain/db/conn'
const { Schema } = mongoose

const EntryInvoice =
  mongoose.models.EntryInvoice ||
  mongoose.model(
    'Note',
    new Schema(
      {
        note: {
          type: String,
          required: false
        }
      },
      { timestamps: true }
    )
  )

export default EntryInvoice
