import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationsController.handle);

export { specificationsRoutes }