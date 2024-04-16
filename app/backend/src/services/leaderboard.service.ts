import generateLeaderBoard from '../utils/generateLeaderboard';
import { Ileaderboard } from '../Interfaces/Leaderboard/ILeaderborad';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class LeaderBoardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async getLeaderboard(): Promise<ServiceResponse<Ileaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.getAll();

    const matchFinished = allMatches.filter((match) => match.inProgress === false);
    console.log(matchFinished);

    const leaderboard = allTeams.map((team) => {
      const matches = matchFinished.filter((match) => team.id === match.homeTeamId);
      console.log(team.teamName);

      return generateLeaderBoard(matches, team.teamName);
    });

    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
