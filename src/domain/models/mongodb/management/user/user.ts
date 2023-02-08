import mongoose from '@/domain/db/conn'
const { Schema } = mongoose

const User = mongoose.models.User || mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    companyId: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
  )
)

export default User
