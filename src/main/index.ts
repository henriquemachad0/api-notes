import './config/module-alias'
import env from '@/main/config/env'
import { connectMongo } from '@/domain/db/conn'

connectMongo()
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    )
  })
  .catch(console.error)
