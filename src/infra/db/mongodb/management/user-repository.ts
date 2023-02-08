import User from '@/domain/models/mongodb/management/user/user'
import IUser from '@/domain/models/types/management/user/IUser'

import { GetByEmailUser } from '@/domain/usecases/management/user/get-by-email-user'
import { GetByIdUser } from '@/domain/usecases/management/user/get-by-id-user'
import { RegisterUser } from '@/domain/usecases/management/user/register-user'
import { UpdateUser } from '@/domain/usecases/management/user/update-user'

import { UpdateUserRepository } from '@/data/protocols/db/management/user/update-user-repository'

import bcryptjs from 'bcryptjs'

export class UserRepository
implements RegisterUser, GetByEmailUser, UpdateUser, GetByIdUser {
  async register (name: string, email: string, password: string): Promise<IUser> {
    // create a password
    const salt = await bcryptjs.genSalt(12)
    const passwordHash = await bcryptjs.hash(password, salt)

    // create a user
    const user = new User({
      name,
      email,
      password: passwordHash
    })

    const userRespoonse = await user.save()
    return userRespoonse as unknown as IUser
  }

  async update (data: UpdateUserRepository.Params): Promise<void> {
    // creating password
    const salt = await bcryptjs.genSalt(12)
    const passwordHash = await bcryptjs.hash(data.password, salt)

    data.user.name = data.name
    data.user.email = data.email
    data.user.password = passwordHash
    await User.findOneAndUpdate(
      { _id: data.user._id },
      { $set: data.user },
      { new: true }
    )
  }

  async getByEmail (email: string): Promise<IUser> {
    const userExists = await User.findOne({ email: email })

    return userExists as unknown as IUser
  }

  async getById (_id: string): Promise<IUser> {
    const user = await User.findOne({ _id: _id })

    return user ? (user as unknown as IUser) : null
  }
}
