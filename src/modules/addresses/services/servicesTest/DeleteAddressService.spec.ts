import FakeAddressesRespository from '@modules/addresses/repositories/fakes/FakeAddressesRespository';
import AppError from '@shared/errors/AppError';

import DeleteAddressService from '../DeleteAddressService';

let fakeAddressesRespository: FakeAddressesRespository;
let deleteAddress: DeleteAddressService;

describe('DeleteAddress', () => {
  beforeEach(() => {
    fakeAddressesRespository = new FakeAddressesRespository();

    deleteAddress = new DeleteAddressService(fakeAddressesRespository);
  });

  it('should be able to delete an address', async () => {
    const address = await fakeAddressesRespository.create({
      street: '9 of july',
      number: 12,
      complement: 'apto',
      cep: '12147-134',
      city: 'São José',
      state: 'SP',
      type: 'Commercial',
    });

    const deletedAddress = await deleteAddress.execute(address.id);

    expect(deletedAddress).toBeUndefined();
  });

  it('should not be able to delete an address that nonexistent', async () => {
    await expect(
      deleteAddress.execute('nonexistent id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
