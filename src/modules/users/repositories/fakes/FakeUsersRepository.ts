import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRpository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    password,
    cpf,
    age,
    weight,
    ethnicity,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      cpf,
      age,
      weight,
      ethnicity,
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
