import mongoose from '@/domain/db/conn'
const { Schema } = mongoose

const Company =
  mongoose.models.Company ||
  mongoose.model(
    'Company',
    new Schema(
      {
        users: [
          {
            _id: {
              type: String,
              required: false
            }
          }
        ]
      },
      { timestamps: true }
    )
  )

export default Company
