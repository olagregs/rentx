import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "../IcategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category;

    Object.assign(category, {
      name,
      description
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepositoryInMemory }