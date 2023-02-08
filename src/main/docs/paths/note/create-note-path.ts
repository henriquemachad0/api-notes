export const createNotePath = {
  post: {
    summary: 'Cadastro de nota',
    description: 'Essa rota será responsável por cadastrar uma nota',
    tags: ['Note'],
    security: [
      {
        bearerAuth: []
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
                note: 'nome exemplo'
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
