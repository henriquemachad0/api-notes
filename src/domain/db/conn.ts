import env from '@/main/config/env'
import mongoose from 'mongoose'

export async function connectMongo (): Promise<void> {
  await mongoose.connect(env.mongoUrl)
}

export default mongoose
