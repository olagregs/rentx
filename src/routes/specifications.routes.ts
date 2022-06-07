import { Router } from 'express';
import { createSpecificationsController } from '../modules/cars/useCase/CreateSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationsController.handle(request, response);
});

export { specificationsRoutes }