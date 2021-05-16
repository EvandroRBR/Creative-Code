import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateAddressDTO {
  user_id?: User;
  street: string;
  number: number;
  complement: string;
  cep: string;
  city: string;
  state: string;
  type: string;
}
