import { Repository } from "typeorm";

import { dataSource } from "@shared/infra/typeorm/dataSource";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "@modules/cars/repositories/IcategoriesRepository";

class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: { name: name }
    });

    return category;
  }
}

export { CategoriesRepository }