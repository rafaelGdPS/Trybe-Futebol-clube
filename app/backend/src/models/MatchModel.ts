import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

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
    // const allMatches = matches
    //   .map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
    //     { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
    //   ));
    return matches;
  }
}
