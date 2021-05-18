import AppError from '@shared/errors/AppError';

import FakeAddressesRepository from '@modules/addresses/repositories/fakes/FakeAddressesRespository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateAddress: UpdateAddressService;

describe('UpdateAddress', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updateAddress = new UpdateAddressService(fakeAddressesRepository);
  });

  it('should be able to update address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const address = await fakeAddressesRepository.create({
      street: '9 of july',
      number: 12,
      complement: 'apto',
      cep: '12147-134',
      city: 'São José dos Campos',
      state: 'SP',
      type: 'Commercial',
    });

    address.user_id = user;

    const updatedAddress = await updateAddress.execute({
      userId: user,
      addressId: address.id,
      street: 'Jk Avenue',
      number: 12,
      complement: 'aptos',
      cep: '1',
      city: 'São José',
      state: 'SP',
      type: 'Commercial',
    });

    expect(updatedAddress.street).toBe('Jk Avenue');
  });

  it('should not be able to update address from anothe user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const address = await fakeAddressesRepository.create({
      street: '9 of july',
      number: 12,
      complement: 'apto',
      cep: '12147-134',
      city: 'São José dos Campos',
      state: 'SP',
      type: 'Commercial',
    });

    await expect(
      updateAddress.execute({
        userId: user,
        addressId: address.id,
        street: 'Jk Avenue',
        number: 12,
        complement: 'aptos',
        cep: '1',
        city: 'São José',
        state: 'SP',
        type: 'Commercial',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
