import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import LoginValidation from '../middlewares/loginValidation';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.patch(
  '/:id',
  LoginValidation.validationToken,
  (req: Request, res: Response) =>
    matchController.updateResulMatch(req, res),
);
router.patch(
  '/:id/finish',
  LoginValidation.validationToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
export default router;
