import { Ileaderboard } from '../Interfaces/Leaderboard/ILeaderborad';
import { IMatch } from '../Interfaces/matches/IMatch';

const tableValue = (match: IMatch) => {
  let v = 0;
  let e = 0;
  let d = 0;
  if (match.homeTeamGoals > match.awayTeamGoals) v += 3;
  if (match.homeTeamGoals === match.awayTeamGoals) e += 1;
  if (match.homeTeamGoals < match.awayTeamGoals) d += 1;
  const p = v + e;

  return { v, e, p, d };
};

const INITIAL_VALUE = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0',
};

const test = (acc: string, p: number, j: number) => (Number(acc) + (p / (j * 3)) * 100).toFixed(2);

const generateLeaderBoard = (matches: IMatch[], name: string): Ileaderboard => {
  const j = matches.length;
  return matches.reduce((acc, match) => {
    const { d, e, p, v } = tableValue(match);
    const gp = acc.goalsFavor + match.homeTeamGoals;
    const gc = acc.goalsOwn + match.awayTeamGoals;

    return {
      name,
      totalPoints: acc.totalPoints + p,
      totalGames: j,
      totalVictories: acc.totalVictories + v / 3,
      totalDraws: acc.totalDraws + e,
      totalLosses: acc.totalLosses + d,
      goalsFavor: gp,
      goalsOwn: gc,
      goalsBalance: gp - gc,
      efficiency: `${test(acc.efficiency, p, j)}`,
    };
  }, INITIAL_VALUE);
};

export default generateLeaderBoard;
