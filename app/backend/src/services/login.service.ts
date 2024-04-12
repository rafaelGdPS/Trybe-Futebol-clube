import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin } from '../Interfaces/Login/ILogin';
import { ILoginModel } from '../Interfaces/Login/ILoginModel';
import LoginModel from '../models/LoginModel';
import { IToken } from '../Interfaces/Login/IToken';
import JWT from '../utils/JWT';
import { IRole } from '../Interfaces/Login/IRole';

export default class LoginService {
  constructor(
    private loginModel: ILoginModel = new LoginModel(),
    private jwt = JWT,
  ) {}

  public async login(body: ILogin): Promise<ServiceResponse<IToken>> {
    const user = await this.loginModel.login(body.email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    if (!bcrypt.compareSync(body.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { email } = user;
    const token = this.jwt.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async role(email: string): Promise<ServiceResponse<IRole>> {
    const user = await this.loginModel.login(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Not found user' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
