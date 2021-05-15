import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRpository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
