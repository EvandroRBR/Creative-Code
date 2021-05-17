import FakeAddressesRespository from '@modules/addresses/repositories/fakes/FakeAddressesRespository';

import ListAdressesService from '../ListAdressesService';

let fakeAddressesRespository: FakeAddressesRespository;
let listAdresses: ListAdressesService;

describe('ListAdresses', () => {
  beforeEach(() => {
    fakeAddressesRespository = new FakeAddressesRespository();

    listAdresses = new ListAdressesService(fakeAddressesRespository);
  });

  it('should be able to list all adresses', async () => {
    const address1 = await fakeAddressesRespository.create({
      street: '9 of july',
      number: 12,
      complement: 'apto',
      cep: '12147-134',
      city: 'São José dos Campos',
      state: 'SP',
      type: 'Commercial',
    });

    const address2 = await fakeAddressesRespository.create({
      street: 'Papa João XXIII',
      number: 361,
      complement: 'house',
      cep: '12220-541',
      city: 'São José dos Campos',
      state: 'SP',
      type: 'Commercial',
    });

    const allAdresses = await listAdresses.execute();

    expect(allAdresses).toEqual([address1, address2]);
  });
});
