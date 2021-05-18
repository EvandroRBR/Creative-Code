import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Address from '@modules/addresses/infra/typeorm/entities/Address';
import User from '@modules/users/infra/typeorm/entities/User';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';

interface IRequest {
  userId: User;
  addressId: string;
  street?: string;
  number?: number;
  complement?: string;
  cep?: string;
  city?: string;
  state?: string;
  type?: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    userId,
    addressId,
    street,
    number,
    complement,
    cep,
    city,
    state,
    type,
  }: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(addressId);

    if (!userId) {
      throw new AppError('You need to login', 400);
    }

    if (!address) {
      throw new AppError('Address does not exists', 400);
    }

    if (address.user_id !== userId) {
      throw new AppError(
        'You do not have permission to update addresses from another user',
        400,
      );
    }

    Object.assign(address, {
      street,
      number,
      complement,
      cep,
      city,
      state,
      type,
    });

    await this.addressesRepository.update(address);

    return address;
  }
}

export default UpdateAddressService;
