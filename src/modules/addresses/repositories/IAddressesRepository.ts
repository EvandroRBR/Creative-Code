import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

export default interface IAddressesRepository {
  create(addressData: ICreateAddressDTO): Promise<Address>;
  findAll(): Promise<Address[]>;
  findByCep(cep: string): Promise<Address | undefined>;
}
