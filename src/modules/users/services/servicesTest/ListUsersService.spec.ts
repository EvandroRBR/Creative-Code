import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListUsersService from '../ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe Brother',
      email: 'johnbrother@example.com',
      password: '123456',
      cpf: '88888888888',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const allUsers = await listUsers.execute();

    expect(allUsers).toEqual([user1, user2]);
  });
});
