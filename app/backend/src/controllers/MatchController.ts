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
      const matchesFiltered = matches
        .filter((match) => JSON.stringify(match.inProgress) === inProgress);

      allMatches = matchesFiltered;
    }

    res.status(mapStatusHTTP(status)).json(allMatches);
  }

  public async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.matchService.matchFinish(id);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateResulMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const results = req.body;
    const { data, status } = await this.matchService.updateMatch(id, results);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { body } = req;

    const { data, status } = await this.matchService.create(body);

    console.log(status);

    res.status(mapStatusHTTP(status)).json(data);
  }
}
