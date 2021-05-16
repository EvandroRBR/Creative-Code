import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.params.id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute(userId);

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUsersService);

    const users = await listUserService.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userData = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(userData);

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const userData = request.body;

    Object.assign(userData, { userId });

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute(userData);

    return response.json(user);
  }
}
