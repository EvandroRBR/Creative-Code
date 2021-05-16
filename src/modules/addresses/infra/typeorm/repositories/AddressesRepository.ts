import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';

import Address from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(addressData);

    await this.ormRepository.save(address);

    return address;
  }
}

export default AddressesRepository;
