import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidation from '../middlewares/loginValidation';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  LoginValidation.validations,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
