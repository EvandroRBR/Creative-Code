import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAddressService from '@modules/addresses/services/CreateAddressesService';
import ListAdressesService from '@modules/addresses/services/ListAdressesService';
import FindAddressByCepService from '@modules/addresses/services/FindAddressByCepService';
import DeleteAddressService from '@modules/addresses/services/DeleteAddressService';

export default class AddressController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { cep } = request.params;
    const listAddresses = container.resolve(FindAddressByCepService);

    const address = await listAddresses.execute(cep);

    return response.json(address);
  }

  public async show(request: Request, response: Response): Promise<Response> {
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const AddressId = request.params.id;

    const createAddress = container.resolve(DeleteAddressService);

    await createAddress.execute(AddressId);

    return response.json({ message: 'Address was deleted' });
  }
}
