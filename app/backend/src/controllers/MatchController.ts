import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { data, status } = await this.matchService.getAll();
    const { inProgress } = req.query;
    const matches = data as IMatch[];
    let allMatches = data;
    if (inProgress) {
      const matchesFiltered = matches.filter((match) => {
        console.log(typeof match.inProgress);
        console.log(typeof inProgress);

        return JSON.stringify(match.inProgress) === inProgress;
      });

      allMatches = matchesFiltered;
    }

    res.status(mapStatusHTTP(status)).json(allMatches);
  }

  public async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.matchService.matchFinish(id);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
