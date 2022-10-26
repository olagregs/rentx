import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import createConnection from '@shared/infra/typeorm/dataSource';
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
    await createConnection();

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already Exists");
    }

    const passowrdHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passowrdHash,
      email,
      driver_license
    });
  }
}

export { CreateUserUseCase }