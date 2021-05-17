import FakeAddressesRespository from '@modules/addresses/repositories/fakes/FakeAddressesRespository';
import CreateAddressService from '@modules/addresses/services/CreateAddressesService';

let fakeAddressesRespository: FakeAddressesRespository;

let createAddress: CreateAddressService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressesRespository = new FakeAddressesRespository();

    createAddress = new CreateAddressService(fakeAddressesRespository);
  });

  it('should be able to create a new address', async () => {
    const address = await createAddress.execute({
      street: '9 of july',
      number: 12,
      complement: 'apto',
      cep: '12147-134',
      city: 'São José',
      state: 'SP',
      type: 'Commercial',
    });

    expect(address).toHaveProperty('id');
  });
});
