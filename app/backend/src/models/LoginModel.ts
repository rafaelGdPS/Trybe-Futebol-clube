import { IUser } from '../Interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import { ILoginModel } from '../Interfaces/Login/ILoginModel';

export default class LoginModel implements ILoginModel {
  private model = SequelizeUser;

  async login(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }
}
