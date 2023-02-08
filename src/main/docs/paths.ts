import { createNotePath } from './paths/note/create-note-path'
import { getAllNotePath } from './paths/note/get-all-note-path'
import { getByIdNotePath } from './paths/note/get-by-id-note-path'
import { updateNotePath } from './paths/note/update-note-path'
import { removeNotePath } from './paths/note/remove-note-path'

import { registerUserPath } from './paths/management/users/register-user-path'
import { loginUserPath } from './paths/management/users/login-user-path'
import { updateUserPath } from './paths/management/users/update-user-path'
import { refreshTokenUserPath } from './paths/management/users/refresh-token-user-path'

export default {
  '/users/register': registerUserPath,
  '/users/login': loginUserPath,
  '/users/edit/{id}': updateUserPath,
  '/users/refresh-token': refreshTokenUserPath,

  '/note/create': createNotePath,
  '/note/': getAllNotePath,
  '/note/{id}': getByIdNotePath,
  '/note/update/{id}': updateNotePath,
  '/note/remove/{id}': removeNotePath
}
