import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRpository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    age,
    weight,
    ethnicity,
  }: ICreateUserDTO): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already in use', 401);
    }

    const cpfExists = await this.usersRepository.findByCpf(cpf);

    if (cpfExists) {
      throw new AppError('CPF already in use', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      age,
      weight,
      ethnicity,
    });

    return user;
  }
}

export default CreateUserService;
