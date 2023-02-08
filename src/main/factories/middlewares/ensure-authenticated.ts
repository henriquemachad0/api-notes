/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import auth from '@/main/config/auth'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(403).json({ error: 'Token missing' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload

    request.user = {
      id: user_id
    }

    next()
  } catch {
    return response.status(403).json({ error: 'Invalid token' })
  }
}
