import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

import createConnection from "../dataSource";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS (id, name, password, email, driver_license, "isAdmin", created_at) 
    VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', 'xxx-xxxx', true ,'now()')`
  );

  await connection.destroy();
}

create().then(() => console.log("User admin created!"));