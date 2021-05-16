// import AppError from '@shared/errors/AppError';

import FakeAddressesRespository from '@modules/addresses/repositories/fakes/FakeAddressesRespository';
import CreateAddressService from '@modules/addresses/services/CreateAddressService';
// import { uuid } from 'uuidv4';

// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeAddressesRespository: FakeAddressesRespository;
// let fakeUsersRepository: FakeUsersRepository;

let createAddress: CreateAddressService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressesRespository = new FakeAddressesRespository();
    // fakeUsersRepository = new FakeUsersRepository();

    createAddress = new CreateAddressService(fakeAddressesRespository);
  });

  it('should be able to create a new address', async () => {
    // const user = await fakeUsersRepository.create({
    //   name: 'John Doe',
    //   email: 'johndoe@example.com',
    //   password: '123456',
    //   cpf: '99999999999',
    //   age: 30,
    //   weight: 85.5,
    //   ethnicity: 'indigenous',
    // });

    // console.log(user);

    const address = await createAddress.execute({
      street: '9 of july',
      number: 12,
      complement: 'apto',
      cep: '12147-134',
      city: 'São José',
      state: 'SP',
      type: 'Commercial',
    });

    // console.log(address);

    expect(address).toHaveProperty('id');
  });
});
