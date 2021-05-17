import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Address from '@modules/addresses/infra/typeorm/entities/Address';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';

@injectable()
class FindAddressByCepService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(cep: string): Promise<Address> {
    const address = await this.addressesRepository.findByCep(cep);

    if (!address) {
      throw new AppError('address does not found', 404);
    }

    return address;
  }
}

export default FindAddressByCepService;
