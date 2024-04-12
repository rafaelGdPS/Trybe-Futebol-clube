// import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin } from '../Interfaces/Login/ILogin';
import { ILoginModel } from '../Interfaces/Login/ILoginModel';
import LoginModel from '../models/LoginModel';
import { IToken } from '../Interfaces/Login/IToken';
import JWT from '../utils/JWT';

export default class LoginService {
  constructor(
    private loginModel: ILoginModel = new LoginModel(),
    private jwt = JWT,
  ) {}

  public async login(body: ILogin): Promise<ServiceResponse<IToken>> {
    const user = await this.loginModel.login(body.email);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'Not found user' } };

    // if (!bcrypt.compareSync(body.password, user.password)) {
    //   return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    // }
    const { email } = user;
    const token = this.jwt.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
