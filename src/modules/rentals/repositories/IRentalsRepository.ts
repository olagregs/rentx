import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create({ user_id, car_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findRentalsByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository }