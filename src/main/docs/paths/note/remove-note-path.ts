export const removeNotePath = {
  delete: {
    description: 'Remoção de uma nota pelo id',
    summary: 'Remoção de uma nota pelo id',
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
        description: 'Id da nota',
        required: true
      }
    ],
    responses: {
      401: {
        description: 'Acesso negado!'
      },
      400: {
        description: 'Token inválido!'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      204: {
        description: 'Sucesso, mas sem dados para exibir'
      }
    }
  }
}
