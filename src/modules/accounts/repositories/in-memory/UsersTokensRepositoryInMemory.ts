import { IUserTokenDTO } from "@modules/accounts/dtos/IUserTokenDTO";
import { UsersToken } from "@modules/accounts/infra/typeorm/entities/UsersToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UsersToken[] = [];

  async create({ refresh_token, user_id, expires_date }: IUserTokenDTO): Promise<UsersToken> {
    const usersTokens = new UsersToken();

    Object.assign(usersTokens, {
      refresh_token,
      user_id,
      expires_date
    });

    this.userTokens.push(usersTokens);

    return usersTokens;
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
    const usersTokens = this.userTokens.find((userTokens) => userTokens.id === user_id && userTokens.refresh_token && refresh_token);

    return usersTokens;
  }
  async deleteById(id: string): Promise<void> {
    const usersTokens = this.userTokens.find((userTokens) => userTokens.id == id);

    this.userTokens.splice(this.userTokens.indexOf(usersTokens));
  }
  async findByRefreshToken(refresh_token: string): Promise<UsersToken> {
    const usersTokens = this.userTokens.find((userTokens) => userTokens.refresh_token === refresh_token);

    return usersTokens;
  }

}

export { UsersTokensRepositoryInMemory }