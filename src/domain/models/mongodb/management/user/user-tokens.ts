import mongoose from '@/domain/db/conn'
const { Schema } = mongoose

const UserTokens = mongoose.models.UserTokens || mongoose.model(
  'UserTokens',
  new Schema({
    refresh_token: {
      type: String,
      required: false
    },
    user_id: {
      type: String,
      required: false
    },
    expires_date: {
      type: Date,
      required: false
    }
  },
  { timestamps: true }
  )
)

export default UserTokens
