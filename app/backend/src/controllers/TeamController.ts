import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getAllTeams(req: Request, res: Response) {
    const { data, status } = await this.teamService.getAllTeams();

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.teamService.getTeamById(id);

    res.status(mapStatusHTTP(status)).json(data);
  }
}
