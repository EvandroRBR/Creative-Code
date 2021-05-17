import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserService from '../UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const updatedUser = await updateUser.execute({
      userId: user.id,
      name: 'John Doe Johnson',
      email: 'johnjohnson@example.com',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    expect(updatedUser.email).toBe('johnjohnson@example.com');
  });

  it('should not be able to update user without been logged', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    await expect(
      updateUser.execute({
        name: 'John Doe Johnson',
        email: 'johnjohnson@example.com',
        password: '123456',
        age: 30,
        weight: 85.5,
        ethnicity: 'indigenous',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateUser.execute({
        userId: 'non-existing-user-id',
        email: 'johntre@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email with an email used to another', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe Brother',
      email: 'johnbrother@example.com',
      password: '123456',
      cpf: '88888888888',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    await expect(
      updateUser.execute({
        userId: user.id,
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const updatedUser = await updateUser.execute({
      userId: user.id,
      email: 'johnjohnson@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    await expect(
      updateUser.execute({
        userId: user.id,
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    await expect(
      updateUser.execute({
        userId: user.id,
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
