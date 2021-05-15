import { Router } from 'express';

import UsersController from '@modules/users/infra/typeorm/http/routes/user.routes';

const routes = Router();

routes.use('/users', UsersController);

export default routes;
