import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  async getAll(): Promise<IMatch []> {
    const matches = await this.model.findAll({
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
      ],
    });

    return matches;
  }

  async getAllSimpleMatches(): Promise<IMatch []> {
    return this.model.findAll();
  }

  async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    return match;
  }

  async updated(match: IMatch, id: number): Promise<IMatch | null> {
    await this.model.update(match, { where: { id } });
    const findMatch = this.model.findByPk(id);
    if (!findMatch) return null;
    return findMatch;
  }

  async create(body: NewEntity<IMatch>): Promise<IMatch> {
    const newMatch = await this.model.create(body);

    return newMatch;
  }
}
