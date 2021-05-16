import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import DeleteUserService from '../DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUser = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe Brother',
      email: 'johnbrother@example.com',
      password: '123456',
      cpf: '88888888888',
      age: 30,
      weight: 85.5,
      ethnicity: 'indigenous',
    });

    const deletedUser = await deleteUser.execute(user.id);

    expect(deletedUser).toBeUndefined();
  });

  it('should not be able to delete a user if it does not exist', async () => {
    const userId = 'user non-existing';

    await expect(deleteUser.execute(userId)).rejects.toBeInstanceOf(AppError);
  });
});
