import { inject, injectable } from 'tsyringe';

import Address from '@modules/addresses/infra/typeorm/entities/Address';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';

@injectable()
class ListAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(): Promise<Address[]> {
    const addresses = await this.addressesRepository.findAll();

    return addresses;
  }
}

export default ListAddressesService;
