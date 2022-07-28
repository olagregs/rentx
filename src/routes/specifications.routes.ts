import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCase/CreateSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationsController.handle);

export { specificationsRoutes }