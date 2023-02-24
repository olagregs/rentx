import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/IcategoriesRepository";
import createConnection from '@shared/infra/typeorm/dataSource';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository) { }

  async execute(): Promise<Category[]> {
    await createConnection();

    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase }