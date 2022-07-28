import 'reflect-metadata';
import express from "express";
import swaggerUi from 'swagger-ui-express';

import { routes } from "./routes/index.routes";
import swaggerFile from './swagger.json';

import './database/dataSource';
import './shared/container';

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => console.log("Server is running!"));