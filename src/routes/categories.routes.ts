import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCase/createCategory";
import { importCategoryController } from "../modules/cars/useCase/ImportCategory";
import { listCategoriesController } from "../modules/cars/useCase/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/", (request, response) => {
  return importCategoryController.handle(request, response);
});

//Check import category routes

export { categoriesRoutes };
