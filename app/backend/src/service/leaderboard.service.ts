import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import MainLeaderBoard from '../abstracts/LeaderBoard';

class LeaderBoardService extends MainLeaderBoard {
  public generateLeaderBoard = async () => {
    this.teams = await Team.findAll();
    this.matches = await Match.findAll({ where: { inProgress: 0 } });
    for (let i = 0; i < this.teams.length; i += 1) {
      const matches = this.getMatchesByTeamId(this.teams[i].id);
      const mainTeams = this.generateMainTeams(matches, this.teams[i].id);
      this.leaderBoard.push({ name: this.teams[i].teamName,
        totalPoints: this.totalPoints(mainTeams),
        totalGames: matches.length,
        totalVictories: this.totalVictories(mainTeams),
        totalDraws: this.totalDraws(mainTeams),
        totalLosses: this.totalLosses(mainTeams),
        goalsFavor: this.totalGoalsFavor(mainTeams),
        goalsOwn: this.totalGoalsOwn(mainTeams),
        goalsBalance: this.goalsBalance(mainTeams),
        efficiency: this.efficiency(mainTeams),
      });
    }
    return this.leaderBoard;
  };

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
