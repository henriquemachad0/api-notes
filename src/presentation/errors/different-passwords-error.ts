export class DifferentPasswordsError extends Error {
  constructor () {
    super('Password and password confirmation must match')
    this.name = 'DifferentPasswordsError'
  }
}
