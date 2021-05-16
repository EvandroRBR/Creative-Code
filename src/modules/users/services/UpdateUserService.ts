import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRpository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  userId?: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
  age?: number;
  weight?: number;
  ethnicity?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    old_password,
    password,
    age,
    weight,
    ethnicity,
  }: IRequest): Promise<User> {
    if (!userId) {
      throw new AppError('You need to login', 400);
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not found', 404);
    }

    if (email) {
      const userEmailExists = await this.userRepository.findByEmail(email);

      if (userEmailExists && userEmailExists?.id !== userId) {
        throw new AppError('Email already in use', 401);
      }
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
        403,
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.', 403);
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    Object.assign(user, {
      name,
      email,
      age,
      weight,
      ethnicity,
    });

    await this.userRepository.update(user);

    return user;
  }
}

export default UpdateUserService;
