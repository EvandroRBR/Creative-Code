import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import AddressesController from '../controller/AddressesController';

const addressesRouter = Router();

const addressesController = new AddressesController();

addressesRouter.use(ensuredAuthenticated);

addressesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      number: Joi.number().required(),
      complement: Joi.string().required(),
      cep: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  addressesController.create,
);

export default addressesRouter;
