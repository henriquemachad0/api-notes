import mongoose from '@/domain/db/conn'
const { Schema } = mongoose

const Errors = mongoose.models.Errors || mongoose.model(
  'Errors',
  new Schema({
    stack: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
  )
)

export default Errors
