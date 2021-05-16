import IUsersRepository from '@modules/users/repositories/IUsersRpository';
import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async findById(userId: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { id: userId } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = this.ormRepository.find();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { cpf } });

    return user;
  }

  public async update(userData: User): Promise<User> {
    const user = await this.ormRepository.save(userData);

    return user;
  }
}

export default UsersRepository;
