import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const addressData = request.body;
    const teste = request.user.id;

    Object.assign(addressData, { user_id: teste });

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute(addressData);

    return response.json(address);
  }
}
