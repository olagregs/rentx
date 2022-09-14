import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/CreateSpecification/CreateSpecificationController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationsController.handle);

export { specificationsRoutes }