import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      cpf: Joi.string().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      ethnicity: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.use(ensuredAuthenticated);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

usersRouter.get('/', usersController.index);

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: null,
        then: Joi.optional(),
        otherwise: Joi.string(),
      }),
      password_confirmation: Joi.string().when('password', {
        is: null,
        then: Joi.optional(),
        otherwise: Joi.string().valid(Joi.ref('password')),
      }),
      age: Joi.number(),
      weight: Joi.number(),
      ethnicity: Joi.string(),
    },
  }),
  usersController.update,
);

usersRouter.delete('/', usersController.delete);

export default usersRouter;
