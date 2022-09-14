import fs from 'fs';
import { parse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@modules/cars/repositories/IcategoriesRepository';
import { createConnection } from '@shared/infra/typeorm/dataSource';

interface IImportCategory {
  name: string,
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository) { }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line: string) => {
        const [name, description] = line;

        categories.push({
          name,
          description
        });
      })

        .on(("end"), () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })

        .on("error", (err) => {
          reject(err)
        });
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    await createConnection();

    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
}

export { ImportCategoryUseCase }