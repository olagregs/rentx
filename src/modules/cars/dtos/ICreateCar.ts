import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  lisence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO }