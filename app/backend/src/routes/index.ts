import { Router } from 'express';
import teamsRouter from './teams.routes';
import loginRouter from './login.routes';
import matchRouter from './match.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/matches', matchRouter);
router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
