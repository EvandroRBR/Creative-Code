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

  public async findByCep(cep: string): Promise<Address | undefined> {
    return this.addresses.find(address => address.cep === cep);
  }

  public async findById(id: string): Promise<Address | undefined> {
    return this.addresses.find(address => address.id === id);
  }

  async update(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(
      findAddress => findAddress.id === address.id,
    );

    this.addresses[findIndex] = address;

    return address;
  }

  public async delete(address: Address): Promise<void> {
    const findIndex = this.addresses.findIndex(
      deleteAddress => deleteAddress.id === address.id,
    );

    this.addresses.splice(findIndex, 1);
  }
}

export default FakeAddressesRepository;
