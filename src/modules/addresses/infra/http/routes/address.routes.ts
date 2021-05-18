import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import AddressesController from '../controller/AddressesController';

const addressesRouter = Router();

const addressesController = new AddressesController();

addressesRouter.use(ensuredAuthenticated);

addressesRouter.get('/', addressesController.show);

addressesRouter.get(
  '/:cep',
  celebrate({
    [Segments.PARAMS]: {
      cep: Joi.string().required(),
    },
  }),
  addressesController.index,
);

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

addressesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string(),
      number: Joi.number(),
      complement: Joi.string(),
      cep: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      type: Joi.string(),
    },
  }),
  addressesController.update,
);

addressesRouter.delete('/:id', addressesController.delete);

export default addressesRouter;
