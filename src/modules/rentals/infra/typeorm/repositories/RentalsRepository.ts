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
      where: { car_id, end_date: null }
    });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.repotisoty.findOne({
      where: { user_id, end_date: null }
    });

    return openByUser;
  }
  async create({ user_id, car_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repotisoty.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total
    });

    await this.repotisoty.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.repotisoty.findOne({
      where: { id }
    });

    return rental;
  }

  async findRentalsByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.repotisoty.find({
      where: { user_id },
      relations: ['car']
    });

    return rentals;
  }
}

export { RentalsRepository }