import { inject, injectable } from 'tsyringe';

import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

@injectable()
class CreateAdressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(addressData: ICreateAddressDTO): Promise<Address> {
    const address = await this.addressesRepository.create(addressData);

    return address;
  }
}

export default CreateAdressService;
