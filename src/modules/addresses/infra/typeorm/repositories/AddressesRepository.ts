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

  public async findAll(): Promise<Address[]> {
    const address = await this.ormRepository.find({ relations: ['user_id'] });

    return address;
  }

  public async findByCep(cep: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { cep },
      relations: ['user_id'],
    });

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({ where: { id } });

    return address;
  }

  public async delete(address: Address): Promise<void> {
    await this.ormRepository.remove(address);
  }
}

export default AddressesRepository;
