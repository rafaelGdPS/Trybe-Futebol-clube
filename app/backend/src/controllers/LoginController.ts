import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { body } = req;

    const { status, data } = await this.loginService.login(body);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
