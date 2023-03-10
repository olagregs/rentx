import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReserPasswordUserUseCase } from "./ReserPasswordUserUseCase";


class ReserPasswordUserController {
  async handle(request: Request, response: Response) {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(ReserPasswordUserUseCase);

    await resetPasswordUserUseCase.execute({ token: String(token), password });

    return response.send()
  }
}

export { ReserPasswordUserController }