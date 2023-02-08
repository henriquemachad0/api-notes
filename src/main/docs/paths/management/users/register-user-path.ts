export const registerUserPath = {
  post: {
    summary: "Registro de usuário",
    description: "Essa rota será responsável por registrar um novo usuário",
    tags: ["User"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/user",
          },
          examples: {
            user: {
              value: {
                email: "teste@teste.com",
                password: "teste123",
                confirmPassword: "teste123",
              },
            },
          },
        },
      },
    },
    responses: {
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      },
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              properties: {
                message: {
                  type: "string",
                },
                token: {
                  type: "string",
                },
                userId: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
