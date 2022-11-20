import Match from '../database/models/match.model';
import MainLeaderBoard from '../abstracts/LeaderBoard';

class HomeLeaderBoardService extends MainLeaderBoard {
  getMatchesByTeamId = (id: number) => {
    const matchesHome = this.matches.filter((match) => match.homeTeam === id);
    return matchesHome;
  };

  generateMainTeams = (matches: Match[]) => {
    const result = matches.map((match: Match) => ({
      mainGoals: match.homeTeamGoals,
      subGoals: match.awayTeamGoals,
    }));
    return result;
  };
}

export default HomeLeaderBoardService;
