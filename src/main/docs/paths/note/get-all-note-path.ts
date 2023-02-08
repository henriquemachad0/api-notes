export const getAllNotePath = {
  get: {
    description: 'Busca de todas as notas',
    summary: 'Busca de todas as notas',
    tags: ['Note'],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      500: {
        $ref: '#/components/serverError'
      },
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/note'
              }
            }
          }
        }
      }
    }
  }
}
