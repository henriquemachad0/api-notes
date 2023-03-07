export const updateUserPath = {
  patch: {
    description: 'Edição de um usuário',
    summary: 'Edição de um usuário',
    tags: ['User'],
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Id para edição do usuário',
        required: true
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/user'
          },
          examples: {
            user: {
              value: {
                email: 'teste@teste.com',
                password: 'teste',
                confirmPassword: 'teste'
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
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      },
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
}
