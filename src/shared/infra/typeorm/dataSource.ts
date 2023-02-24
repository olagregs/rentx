import 'reflect-metadata';
import { DataSource } from "typeorm";

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CreateCategories1658352228911 } from '@shared/infra/typeorm/migrations/1658352228911-CreateCategories';
import { CreateSpecifications1658965983839 } from '@shared/infra/typeorm/migrations/1658965983839-CreateSpecifications';
import { CreateUsers1661807580205 } from '@shared/infra/typeorm/migrations/1661807580205-CreateUsers';
import { AlterUserDeleteUsername1661814870720 } from '@shared/infra/typeorm/migrations/1661814870720-AlterUserDeleteUsername';
import { AlterUserAddAvatar1661895520259 } from '@shared/infra/typeorm/migrations/1661895520259-AlterUserAddAvatar';
import { CreateCars1663368018590 } from './migrations/1663368018590-CreateCars';
import { CreateSpecificationsCars1664317865460 } from './migrations/1664317865460-CreateSpecificationsCars';
import { CreateCarImage1664834863881 } from './migrations/1664834863881-CreateCarImage';
import { CreateRentals1665434474411 } from './migrations/1665434474411-CreateRentals';
import { CreateUsersTokens1675764611160 } from './migrations/1675764611160-CreateUsersTokens';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { UsersToken } from '@modules/accounts/infra/typeorm/entities/UsersToken';

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: [
    CreateCategories1658352228911,
    CreateSpecifications1658965983839,
    CreateUsers1661807580205,
    AlterUserDeleteUsername1661814870720,
    AlterUserAddAvatar1661895520259,
    CreateCars1663368018590,
    CreateSpecificationsCars1664317865460,
    CreateCarImage1664834863881,
    CreateRentals1665434474411,
    CreateUsersTokens1675764611160
  ],
  entities: [
    Category,
    Specification,
    User,
    Car,
    CarImage,
    Rental,
    UsersToken
  ]
});

export default async (host = 'database_ignite'): Promise<DataSource> => {
  const defaultOptions = dataSource.options;

  Object.assign(defaultOptions, {
    host: process.env.NODE_ENV === "test" ? "localhost" : host, //"127.0.0.1"
    database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database
  });

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}

export { dataSource }