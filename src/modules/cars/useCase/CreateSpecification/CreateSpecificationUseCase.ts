import { inject, injectable } from "tsyringe";

import { createConnection } from "../../../../database/dataSource";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string,
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository) { }

  async execute({ name, description }: IRequest): Promise<void> {
    await createConnection();

    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    await this.specificationsRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationUseCase }