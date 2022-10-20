import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCar";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({ name, description, daily_rate, lisence_plate, fine_amount, brand, category_id, id }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      lisence_plate,
      fine_amount,
      brand,
      category_id,
      id
    });

    this.cars.push(car);

    return car;
  }

  async findByLisencePlate(lisence_plate: string): Promise<Car> {
    return this.cars.find((car) => car.lisence_plate === lisence_plate);
  }

  async findAvailable(category_id: string, name: string, brand: string): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (car.available === true || (
        category_id && car.category_id === category_id &&
        name && car.name === name &&
        brand && car.brand === brand
      )) {
        return car;
      }
    });

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory }