import { Router } from 'express';

import UsersController from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import addressesRouter from '@modules/addresses/infra/http/routes/address.routes';

const routes = Router();

routes.use('/users', UsersController);
routes.use('/sessions', sessionsRouter);
routes.use('/addresses', addressesRouter);

export default routes;
