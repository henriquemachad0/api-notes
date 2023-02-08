export const getByIdNotePath = {
  get: {
    description: 'Busca de um exemplo pelo id',
    summary: 'Busca de um exemplo pelo id',
    tags: ['Note'],
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Id do exemplo',
        required: true
      }
    ],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/schemas/note'
            }
          }
        }
      }
    }
  }
}
