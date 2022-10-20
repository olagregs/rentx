import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCar";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { dataSource } from "@shared/infra/typeorm/dataSource";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({ name, description, daily_rate, lisence_plate, fine_amount, brand, category_id, specifications, id }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      lisence_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });

    await this.repository.save(car);

    return car;
  }
  async findByLisencePlate(lisence_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { lisence_plate }
    });

    return car;
  }

  async findAvailable(category_id?: string, name?: string, brand?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id })
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name })
    }

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand })
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = this.repository.findOne({
      where: { id }
    })

    return car;
  }
}

export { CarsRepository }