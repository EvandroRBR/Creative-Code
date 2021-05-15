import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRpository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userData: ICreateUserDTO): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(userData.email);

    if (emailExists) {
      throw new AppError('Email already in use', 401);
    }

    const cpfExists = await this.usersRepository.findByCpf(userData.cpf);

    if (cpfExists) {
      throw new AppError('CPF already in use', 401);
    }

    const user = this.usersRepository.create(userData);

    return user;
  }
}

export default CreateUserService;
