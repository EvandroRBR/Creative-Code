import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowUserService from '../ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUser = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to find one user by id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const userId = user.id;

    await showUser.execute(userId);

    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).toBe('123456');
  });

  it('should not find a non-existing user', async () => {
    const userId = 'user-id';

    showUser.execute(userId);

    await expect(showUser.execute(userId)).rejects.toBeInstanceOf(AppError);
  });
});
