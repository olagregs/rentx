import 'reflect-metadata';
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/database/migrations/*.ts"],
});

// dataSource.initialize().then(() => {
//   console.log("DataSource initialized!");
// }).catch((err) => {
//   console.log("Error during inicialization", err);
// });

export function createConnection(host = 'database_ignite') {
  return dataSource.setOptions({ host }).initialize();
}

export { dataSource }