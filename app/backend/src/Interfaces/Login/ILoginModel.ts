import { IUser } from '../IUser';
import { ILogin } from './ILogin';

export interface ILoginModel {
  login(email: ILogin['email']): Promise<IUser | null>,
}
