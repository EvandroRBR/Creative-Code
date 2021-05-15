import { Router } from 'express';

import UsersController from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/users', UsersController);
routes.use('/sessions', sessionsRouter);

export default routes;
