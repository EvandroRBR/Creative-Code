import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';
import IAddressesRepository from '../repositories/IAddressesRepository';

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(addressId: string, userId: any): Promise<void> {
    const address = await this.addressesRepository.findById(addressId);

    if (!address) {
      throw new AppError('Adress not found', 404);
    }

    if (address.user_id !== userId) {
      throw new AppError(
        'You do not have permission to delete addresses from another user',
        404,
      );
    }

    await this.addressesRepository.delete(address);
  }
}

export default DeleteAddressService;
