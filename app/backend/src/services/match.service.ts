import { ServiceResponse } from '../Interfaces/ServiceResponse';
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
}
