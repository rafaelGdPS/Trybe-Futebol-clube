import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import Validation from '../middlewares/loginValidation';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  Validation.validationsLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);
router.get(
  '/role',
  Validation.validationToken,
  (req: Request, res: Response) => loginController.role(req, res),
);

export default router;
