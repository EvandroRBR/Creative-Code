import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findById(userId: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
}
