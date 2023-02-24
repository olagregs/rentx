import { Repository } from "typeorm";

import { IUserTokenDTO } from "@modules/accounts/dtos/IUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersToken } from "../entities/UsersToken";
import { dataSource } from "@shared/infra/typeorm/dataSource";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersToken>;

  constructor() {
    this.repository = dataSource.getRepository(UsersToken);
  }

  async create({ refresh_token, user_id, expires_date }: IUserTokenDTO): Promise<UsersToken> {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_date
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
    const usersTokens = await this.repository.findOne({
      where: { user_id, refresh_token }
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository }