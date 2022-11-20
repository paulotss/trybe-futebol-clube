import Match from '../database/models/match.model';
import MainLeaderBoard from '../abstracts/LeaderBoard';

class AwayLeaderBoardService extends MainLeaderBoard {
  getMatchesByTeamId = (id: number) => {
    const matchesHome = this.matches.filter((match) => match.awayTeam === id);
    return matchesHome;
  };

  generateMainTeams = (matches: Match[]) => {
    const result = matches.map((match: Match) => ({
      mainGoals: match.awayTeamGoals,
      subGoals: match.homeTeamGoals,
    }));
    return result;
  };
}

export default AwayLeaderBoardService;
