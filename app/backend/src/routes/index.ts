import { Router } from 'express';
import teamsRouter from './teams.routes';
import loginRouter from './login.routes';
import matchRouter from './match.routes';

const router = Router();

router.use('/matches', matchRouter);
router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;
