import { DbRegisterUser } from '@/data/usecases/management/user/db-register-user'
import { RegisterUserRepositorySpy } from '@/tests/data/mocks/management/mock-db-user'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbRegisterUser
  registerUserRepositorySpy: RegisterUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const registerUserRepositorySpy = new RegisterUserRepositorySpy()
  const sut = new DbRegisterUser(registerUserRepositorySpy)
  return {
    sut,
    registerUserRepositorySpy
  }
}

let name: string
let email: string
let password: string

describe('DbRegisterUser', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password()
  })

  test('Should call RegisterUserRepository', async () => {
    const { sut, registerUserRepositorySpy } = makeSut()
    await sut.register(name, email, password)
    expect(registerUserRepositorySpy.name).toBe(name)
    expect(registerUserRepositorySpy.email).toBe(email)
    expect(registerUserRepositorySpy.password).toBe(password)
  })

  test('Should return a list of User on success', async () => {
    const { sut, registerUserRepositorySpy } = makeSut()
    const surveys = await sut.register(name, email, password)
    expect(surveys).toEqual(registerUserRepositorySpy.result)
  })

  test('Should throw if RegisterUserRepository throws', async () => {
    const { sut, registerUserRepositorySpy } = makeSut()
    jest.spyOn(registerUserRepositorySpy, 'register').mockImplementationOnce(throwError)
    const promise = sut.register(name, email, password)
    await expect(promise).rejects.toThrow()
  })
})
