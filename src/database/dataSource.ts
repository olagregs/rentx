import 'reflect-metadata';
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/modules/cars/entities/*.ts"]
});

export async function createConnection(host = '127.0.0.1') {
  dataSource.setOptions({ host });

  if (!dataSource.isInitialized) {
    await dataSource.initialize();

    return dataSource;
  }
}

export { dataSource }