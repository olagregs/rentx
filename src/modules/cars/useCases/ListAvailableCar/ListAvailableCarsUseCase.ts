import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import createConnection from '@shared/infra/typeorm/dataSource';

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ category_id, name, brand }: IRequest): Promise<Car[]> {
    await createConnection();

    const cars = await this.carsRepository.findAvailable(
      category_id,
      name,
      brand
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase }