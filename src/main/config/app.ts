
import express, { Express } from 'express'
import setupSwagger from '@/main/config/swagger'
import { router } from '../routes'
import { cors } from '@/main/middlewares/cors'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  app.use(express.json())
  setupSwagger(app)
  app.use(cors)
  app.use('/api-notes', router)
  return app
}
