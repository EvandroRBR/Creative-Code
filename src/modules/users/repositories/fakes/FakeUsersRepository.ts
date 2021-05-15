import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRpository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      cpf: userData.cpf,
      age: userData.age,
      weight: userData.weight,
      ethnicity: userData.ethnicity,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findByCpf(cpf: string): Promise<User | undefined> {
    return this.users.find(user => user.cpf === cpf);
  }
}

export default FakeUsersRepository;
