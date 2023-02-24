import { Request, Response, NextFunction } from 'express';

import createConnection from "@shared/infra/typeorm/dataSource";
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  await createConnection();

  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  console.log(user);

  if (!user.isAdmin) {
    throw new AppError("Unauthorized", 401);
  }

  next();
}