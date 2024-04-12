import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class LoginValidation {
  static validations(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validationToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];

    const validToken = JWT.verify(token);

    req.body = validToken;

    console.log(validToken);

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    next();
  }
}

export default LoginValidation;
