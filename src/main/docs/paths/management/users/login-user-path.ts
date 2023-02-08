export const loginUserPath = {
  post: {
    description: "Login de um usuário",
    summary: "Login de um usuário",
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
                token: {
                  type: "string",
                },
                user: {
                  email: {
                    type: "string"
                  },
                },
                refresh_token: {
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
