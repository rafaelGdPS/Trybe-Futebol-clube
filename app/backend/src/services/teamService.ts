import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/IteamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const dataTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: dataTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
