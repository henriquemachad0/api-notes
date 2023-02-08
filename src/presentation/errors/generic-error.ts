export class GenericError extends Error {
  constructor (message: string) {
    super(`${message}`)
    this.name = 'GenericError'
  }
}
