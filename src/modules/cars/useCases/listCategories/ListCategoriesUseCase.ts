import { inject, injectable } from "tsyringe";

import { createConnection } from "../../../../database/dataSource";
import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/IcategoriesRepository";

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