import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { createConnection } from '../../../../database/dataSource';
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
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