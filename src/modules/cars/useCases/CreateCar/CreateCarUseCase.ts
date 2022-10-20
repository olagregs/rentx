import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCar";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { createConnection } from "@shared/infra/typeorm/dataSource";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ name, description, daily_rate, lisence_plate, fine_amount, brand, category_id, }: ICreateCarDTO): Promise<Car> {
    await createConnection();

    const carAreadyExists = await this.carsRepository.findByLisencePlate(lisence_plate);

    if (carAreadyExists) {
      throw new AppError("Car already exists");
    }

    const car = this.carsRepository.create({
      name,
      description,
      daily_rate,
      lisence_plate,
      fine_amount,
      brand,
      category_id
    });

    return car;
  }
}

export { CreateCarUseCase }