import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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

export default usersRouter;
