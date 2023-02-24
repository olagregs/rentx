import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICategoryRepository } from "@modules/cars/repositories/IcategoriesRepository";
import createConnection from '@shared/infra/typeorm/dataSource';

interface IRequest {
  name: string,
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository) { }

  async execute({ name, description }: IRequest): Promise<void> {
    await createConnection();

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    this.categoriesRepository.create({
      name,
      description
    });
  }
}

export { CreateCategoryUseCase }