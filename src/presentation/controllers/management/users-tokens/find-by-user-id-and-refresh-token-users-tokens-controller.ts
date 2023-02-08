import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok, forbidden, noContent } from "@/presentation/helpers";
import { FindByUserIdAndRefreshTokenUsersTokens } from "@/domain/usecases/management/users-tokens/find-by-user-id-and-refresh-token-users-tokens";
import { InvalidParamError } from "@/presentation/errors";

export class FindByUserIdAndRefreshTokenUsersTokensController
  implements Controller
{
  constructor(
    private readonly findByUserIdAndRefreshTokenUsersTokens: FindByUserIdAndRefreshTokenUsersTokens
  ) {}

  async handle(
    request: FindByUserIdAndRefreshTokenUsersTokensController.Request
  ): Promise<HttpResponse> {
    try {
      const user =
        await this.findByUserIdAndRefreshTokenUsersTokens.findByUserIdAndRefreshToken(
          request.user_id,
          request.refresh_token
        );
      return user ? ok(user) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace FindByUserIdAndRefreshTokenUsersTokensController {
  export type Request = {
    user_id: string;
    refresh_token: string;
  };
}
