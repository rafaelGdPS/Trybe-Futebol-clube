import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/loginValidation';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.post(
  '/',
  Validations.validationToken,
  Validations.validateTeams,
  (req: Request, res: Response) =>
    matchController.createMatch(req, res),
);
router.patch(
  '/:id',
  Validations.validationToken,
  (req: Request, res: Response) =>
    matchController.updateResulMatch(req, res),
);
router.patch(
  '/:id/finish',
  Validations.validationToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
export default router;
