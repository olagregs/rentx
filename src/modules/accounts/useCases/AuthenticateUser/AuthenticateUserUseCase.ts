import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";

import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { createConnection } from "../../../../database/dataSource";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string
  }
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    await createConnection();

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or Password incorrect");
    }

    const token = sign({}, "e6ee62ff7606ec9d829519fa8f28af50", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }