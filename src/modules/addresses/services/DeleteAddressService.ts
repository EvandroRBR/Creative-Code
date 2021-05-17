import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAddressesRepository from '../repositories/IAddressesRepository';

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(addressId: string): Promise<void> {
    const address = await this.addressesRepository.findById(addressId);

    if (!address) {
      throw new AppError('Adress not found.', 404);
    }

    await this.addressesRepository.delete(address);
  }
}

export default DeleteAddressService;
