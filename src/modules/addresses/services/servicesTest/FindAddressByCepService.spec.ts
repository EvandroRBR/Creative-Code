import FakeAddressesRespository from '@modules/addresses/repositories/fakes/FakeAddressesRespository';

import FindAddressByCepService from '../FindAddressByCepService';

let fakeAddressesRespository: FakeAddressesRespository;
let findAdresses: FindAddressByCepService;

describe('FindAdressesByCep', () => {
  beforeEach(() => {
    fakeAddressesRespository = new FakeAddressesRespository();

    findAdresses = new FindAddressByCepService(fakeAddressesRespository);
  });

  it('should be able to find address by cep', async () => {
    const address = await fakeAddressesRespository.create({
      street: '9 of july',
      number: 12,
      complement: 'apto',
      cep: '12147-134',
      city: 'São José dos Campos',
      state: 'SP',
      type: 'Commercial',
    });

    const addressByCep = await findAdresses.execute(address.cep);

    expect(addressByCep).toEqual(address);
  });
});
