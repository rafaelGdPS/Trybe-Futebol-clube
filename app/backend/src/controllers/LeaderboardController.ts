import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) {}

  public async getLeaderboard(req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.getLeaderboard();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
