import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import { DataSource } from "typeorm";


import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/dataSource";

let connection: DataSource;

describe("List Category Controller", () => {
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

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { refresh_token } = responseToken.body;

    await request(app).post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest"
      })
      .set({
        authorization: `Bearer ${refresh_token}`
      });

    const response = await request(app).get("/categories");

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toBe("Category Supertest");
  });
})