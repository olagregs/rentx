import { Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { dataSource } from "@shared/infra/typeorm/dataSource";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repotisoty: Repository<Rental>;

  constructor() {
    this.repotisoty = dataSource.getRepository(Rental);
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = this.repotisoty.findOne({
      where: { car_id }
    });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.repotisoty.findOne({
      where: { user_id }
    });

    return openByUser;
  }
  async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repotisoty.create({
      user_id,
      car_id,
      expected_return_date
    });

    await this.repotisoty.save(rental);

    return rental;
  }

}

export { RentalsRepository }