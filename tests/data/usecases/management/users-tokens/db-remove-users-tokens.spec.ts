import { DbRemoveUsersTokens } from '@/data/usecases/management/users-tokens/db-remove-users-tokens'
import { RemoveUsersTokensRepositorySpy } from '@/tests/data/mocks/management/mock-db-users-tokens'
import { throwError } from '@/tests/domain/mocks/test-helpers'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbRemoveUsersTokens
  removeUsersTokensRepositorySpy: RemoveUsersTokensRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeUsersTokensRepositorySpy = new RemoveUsersTokensRepositorySpy()
  const sut = new DbRemoveUsersTokens(removeUsersTokensRepositorySpy)
  return {
    sut,
    removeUsersTokensRepositorySpy
  }
}

let _id: string

describe('DbRemoveUsersTokens', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    _id = faker.datatype.uuid()
  })

  test('Should call RemoveUsersTokensRepository', async () => {
    const { sut, removeUsersTokensRepositorySpy } = makeSut()
    await sut.remove(_id)
    expect(removeUsersTokensRepositorySpy._id).toBe(_id)
  })

  test('Should throw if RemoveUsersTokensRepository throws', async () => {
    const { sut, removeUsersTokensRepositorySpy } = makeSut()
    jest.spyOn(removeUsersTokensRepositorySpy, 'remove').mockImplementationOnce(throwError)
    const promise = sut.remove(_id)
    await expect(promise).rejects.toThrow()
  })
})
