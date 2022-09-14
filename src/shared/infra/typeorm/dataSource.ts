import 'reflect-metadata';
import { DataSource } from "typeorm";

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { CreateCategories1658352228911 } from '@shared/infra/typeorm/migrations/1658352228911-CreateCategories';
import { CreateSpecifications1658965983839 } from '@shared/infra/typeorm/migrations/1658965983839-CreateSpecifications';
import { CreateUsers1661807580205 } from '@shared/infra/typeorm/migrations/1661807580205-CreateUsers';
import { AlterUserDeleteUsername1661814870720 } from '@shared/infra/typeorm/migrations/1661814870720-AlterUserDeleteUsername';
import { AlterUserAddAvatar1661895520259 } from '@shared/infra/typeorm/migrations/1661895520259-AlterUserAddAvatar';

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
    AlterUserAddAvatar1661895520259
  ],
  entities: [
    Category,
    Specification,
    User
  ]
});

export async function createConnection(host = '127.0.0.1') {
  dataSource.setOptions({ host });

  if (!dataSource.isInitialized) {
    await dataSource.initialize();

    return dataSource;
  }
}

export { dataSource }