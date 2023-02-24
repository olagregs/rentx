import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import createConnection from '@shared/infra/typeorm/dataSource';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) { }

  async execute({ car_id, images_name }: IRequest) {
    await createConnection();

    images_name.map(async (image) => {
      this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase }