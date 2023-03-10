import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import createConnection from '@shared/infra/typeorm/dataSource';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ReserPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    await createConnection();

    const userToken = this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Invalid token");
    }

    if (this.dateProvider.compareIfBefore((await userToken).expires_date, this.dateProvider.dateNow())) {
      throw new AppError("Token expired!")
    }

    const user = await this.usersRepository.findById((await userToken).user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById((await userToken).id);
  }
}

export { ReserPasswordUserUseCase }