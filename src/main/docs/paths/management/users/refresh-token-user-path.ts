export const refreshTokenUserPath = {
  post: {
    description: "Refresh do token utiliazando o último refresh token",
    summary: "Refresh do token utiliazando o último refresh token",
    tags: ["User"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/user",
          },
          examples: {
            token: "last_refresh_token",
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
    204: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              refresh_token: {
                type: "string",
              },
              token: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
