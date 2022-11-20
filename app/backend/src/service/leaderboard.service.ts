import Match from '../database/models/match.model';
import MainLeaderBoard from '../abstracts/LeaderBoard';

class LeaderBoardService extends MainLeaderBoard {
  getMatchesByTeamId = (id: number) => {
    const matchesHome = this.matches.filter((match) =>
      (match.homeTeam === id || match.awayTeam === id));
    return matchesHome;
  };

  generateMainTeams = (matches: Match[], id: number) => {
    const result = matches.map((match: Match) => ({
      mainGoals: match.homeTeam === id ? match.homeTeamGoals : match.awayTeamGoals,
      subGoals: match.homeTeam === id ? match.awayTeamGoals : match.homeTeamGoals,
    }));
    return result;
  };
}

export default LeaderBoardService;
