import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { data, status } = await this.matchService.getAll();

    res.status(mapStatusHTTP(status)).json(data);
  }
}
