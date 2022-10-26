import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/dataSource";

let connection: DataSource;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS (id, name, password, email, driver_license, "isAdmin", created_at) 
      VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', 'xxx-xxxx', true ,'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("Should be able to crete a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest"
      })
      .set({
        authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category with same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest"
      })
      .set({
        authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(400);
  });
})