import { IUserTokenDTO } from "../dtos/IUserTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";

interface IUsersTokensRepository {
  create({ refresh_token, user_id, expires_date }: IUserTokenDTO): Promise<UsersToken>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UsersToken>;
}

export { IUsersTokensRepository }