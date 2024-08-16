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

    const leaderboard = allTeams.map((team) => {
      const matches = matchFinished.filter((match) => team.id === match.homeTeamId);
      return generateLeaderBoard(matches, team.teamName);
    });
    const leaderboardClassification = leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalPoints === b.totalPoints
        && b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.totalVictories === b.totalVictories
        && b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsBalance === b.goalsBalance
        && b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });

    return { status: 'SUCCESSFUL', data: leaderboardClassification };
  }
}
