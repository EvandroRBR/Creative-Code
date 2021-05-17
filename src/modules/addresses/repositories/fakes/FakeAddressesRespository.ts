import { uuid } from 'uuidv4';

import Address from '@modules/addresses/infra/typeorm/entities/Address';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';

class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  async create({
    street,
    number,
    complement,
    cep,
    city,
    state,
    type,
  }: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, {
      id: uuid(),
      street,
      number,
      complement,
      cep,
      city,
      state,
      type,
    });

    this.addresses.push(address);

    return address;
  }

  public async findAll(): Promise<Address[]> {
    return this.addresses;
  }
}

export default FakeAddressesRepository;
