import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
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
}
