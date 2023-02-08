import { Controller } from '@/presentation/protocols'

import { Request, Response } from 'express'

import fs from 'fs'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      ...(req.file || undefined),
      user: req.user
    }

    const httpResponse = await controller.handle(request)

    if (httpResponse.body?.filename) {
      res.download(`public/files/${httpResponse.body.filename}`, function () {
        fs.unlink(`public/files/${httpResponse.body.filename}`, function (err) {
          if (err) {
            console.log(err)
          }
        })
      })
    } else if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
