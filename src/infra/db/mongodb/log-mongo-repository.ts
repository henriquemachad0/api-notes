import { LogErrorRepository } from '@/data/protocols/db'
import Errors from '@/domain/models/mongodb/records/outers/errors'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const error = new Errors({
      stack,
      date: new Date()
    })

    await error.save()
  }
}
