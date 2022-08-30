import { inject, injectable } from "tsyringe";

import { createConnection } from "../../../../database/dataSource";
import { AppError } from "../../../../errors/AppError";
import { ICategoryRepository } from "../../repositories/IcategoriesRepository";

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