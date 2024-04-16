 const allMatches = [
  {
    home_team_id: 16,
    home_team_goals: 1,
    away_team_id: 8,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team_id: 9,
    home_team_goals: 1,
    away_team_id: 14,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team_id: 4,
    home_team_goals: 3,
    away_team_id: 11,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team_id: 3,
    home_team_goals: 0,
    away_team_id: 2,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team_id: 7,
    home_team_goals: 1,
    away_team_id: 10,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team_id: 5,
    home_team_goals: 1,
    away_team_id: 13,
    away_team_goals: 1,
    in_progress: false,
  },
 ]

 const validRequest = {
  homeTeamId: 16,
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
 }
 const invalidRequest = {
  homeTeamId: 8,
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
 }

 const newMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true
}

 export default {
  allMatches,
  validRequest,
  newMatch,
  invalidRequest
 }