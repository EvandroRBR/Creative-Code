import AppError from '@shared/errors/AppError';

import FakeAddressesRespository from '@modules/addresses/repositories/fakes/FakeAddressesRespository';

import DeleteAddressService from '../DeleteAddressService';

let fakeAddressesRespository: FakeAddressesRespository;

let deleteAddress: DeleteAddressService;

describe('DeleteAddress', () => {
  beforeEach(() => {
    fakeAddressesRespository = new FakeAddressesRespository();

    deleteAddress = new DeleteAddressService(fakeAddressesRespository);
  });

  it('should not be able to delete an address that nonexistent', async () => {
    await expect(
      deleteAddress.execute('nonexistent addressId', 'nonexistent userId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
