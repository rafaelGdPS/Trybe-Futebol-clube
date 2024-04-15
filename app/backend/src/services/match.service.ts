import { NewEntity } from '../Interfaces';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

type Body = {
  homeTeamGoals: number,
  awayTeamGoals: number
};

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const serviceResponse = await this.matchModel.getAll();

    return { status: 'SUCCESSFUL', data: serviceResponse };
  }

  public async matchFinish(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    await this.matchModel.updated({ ...match, inProgress: false }, id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, body: Body): Promise<ServiceResponse<IMatch | null>> {
    const matchInProgress = await this.matchModel.findById(id);
    if (!matchInProgress || matchInProgress.inProgress === false) {
      return { status: 'INVALID_DATA', data: { message: 'Match is not in progress' } };
    }

    const match = await this.matchModel
      .updated({ ...matchInProgress, ...body }, id);

    return { status: 'SUCCESSFUL', data: match };
  }

  public async create(body: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const allTeams = await this.teamModel.findAll();
    const teamIdList = allTeams.map((team) => team.id);

    if (!teamIdList.includes(body.homeTeamId) || !teamIdList.includes(body.awayTeamId)) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.create({ ...body, inProgress: true });

    return { status: 'CREATED', data: newMatch };
  }
}
