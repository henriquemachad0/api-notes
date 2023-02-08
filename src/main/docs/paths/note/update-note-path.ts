export const updateNotePath = {
  patch: {
    summary: 'Atualização da nota',
    description: 'Essa rota será responsável por atualizar uma nota',
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
        description: 'Id para edição da nota',
        required: true
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/note'
          },
          notes: {
            note: {
              value: {
                bankName: 'nome da nota atualizada'
              }
            }
          }
        }
      }
    },
    responses: {
      401: {
        description: 'Acesso negado!'
      },
      400: {
        description: 'Token inválido!'
      },
      500: {
        $ref: '#/components/serverError'
      },
      204: {
        description: 'Sucesso, mas sem dados para exibir'
      }
    }
  }
}
