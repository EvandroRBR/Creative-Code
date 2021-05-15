import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an used e-mail', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    await expect(
      createUser.execute({
        name: 'John Doe 2',
        email: 'johndoe@example.com',
        password: '123456',
        cpf: '88888888888',
        age: 30,
        weight: 85.5,
        ethnicity: 'indigenous',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an used cpf', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    await expect(
      createUser.execute({
        name: 'John Doe 2',
        email: 'johndoe2@example.com',
        password: '123456',
        cpf: '99999999999',
        age: 30,
        weight: 85.5,
        ethnicity: 'indigenous',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
