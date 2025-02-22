import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  static validationsLogin(req: Request, res: Response, next: NextFunction) {
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

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    req.cookies = validToken;
    next();
  }

  static validateTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}

export default Validations;
