import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAddressService from '@modules/addresses/services/CreateAddressesService';
import ListAdressesService from '@modules/addresses/services/ListAdressesService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAddresses = container.resolve(ListAdressesService);

    const address = await listAddresses.execute();

    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const addressData = request.body;
    const userId = request.user.id;

    Object.assign(addressData, { user_id: userId });

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute(addressData);

    return response.json(address);
  }
}
