import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import { MainTeam, LeaderBoard } from '../interfaces';

abstract class MainLeaderBoard {
  protected leaderBoard: LeaderBoard[];
  protected matches: Match[];
  protected teams: Team[];

  constructor() {
    this.leaderBoard = [];
  }

  public generateLeaderBoard = async () => {
    this.teams = await Team.findAll();
    this.matches = await Match.findAll({ where: { inProgress: 0 } });
    this.leaderBoard = [];
    for (let i = 0; i < this.teams.length; i += 1) {
      const matches = this.getMatchesByTeamId(this.teams[i].id);
      const mainTeams = this.generateMainTeams(matches, this.teams[i].id);
      this.addLeaderBoard(this.teams[i], matches, mainTeams);
    }
    this.sortLeaderBoard();
    return this.leaderBoard;
  };

  abstract getMatchesByTeamId(id: number): Match[];
  abstract generateMainTeams(matches: Match[], id?: number): MainTeam[];

  protected addLeaderBoard = (t: Team, m: Match[], mt: MainTeam[]) => {
    this.leaderBoard.push({ name: t.teamName,
      totalPoints: this.totalPoints(mt),
      totalGames: m.length,
      totalVictories: this.totalVictories(mt),
      totalDraws: this.totalDraws(mt),
      totalLosses: this.totalLosses(mt),
      goalsFavor: this.totalGoalsFavor(mt),
      goalsOwn: this.totalGoalsOwn(mt),
      goalsBalance: this.goalsBalance(mt),
      efficiency: this.efficiency(mt),
    });
  };

  protected sortLeaderBoard = () => {
    this.leaderBoard.sort((a, b) => {
      if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
      if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor - a.goalsFavor !== 0) return b.goalsFavor - a.goalsFavor;
      if (b.goalsOwn - a.goalsOwn !== 0) return a.goalsOwn - b.goalsOwn;
      return 0;
    });
  };

  protected totalPoints = (results: MainTeam[]) => {
    let total = 0;
    results.forEach((result: MainTeam) => {
      if (result.mainGoals > result.subGoals) {
        total += 3;
      } else if (result.mainGoals === result.subGoals) {
        total += 1;
      }
    });
    return total;
  };

  protected totalVictories = (results: MainTeam[]) => {
    let total = 0;
    results.forEach((result: MainTeam) => {
      if (result.mainGoals > result.subGoals) {
        total += 1;
      }
    });
    return total;
  };

  protected totalDraws = (results: MainTeam[]) => {
    let total = 0;
    results.forEach((result: MainTeam) => {
      if (result.mainGoals === result.subGoals) {
        total += 1;
      }
    });
    return total;
  };

  protected totalLosses = (results: MainTeam[]) => {
    let total = 0;
    results.forEach((result: MainTeam) => {
      if (result.mainGoals < result.subGoals) {
        total += 1;
      }
    });
    return total;
  };

  protected totalGoalsFavor = (results: MainTeam[]) => {
    let total = 0;
    results.forEach((result: MainTeam) => {
      total += result.mainGoals;
    });
    return total;
  };

  protected totalGoalsOwn = (results: MainTeam[]) => {
    let total = 0;
    results.forEach((result: MainTeam) => {
      total += result.subGoals;
    });
    return total;
  };

  protected goalsBalance = (results: MainTeam[]) => {
    let total = 0;
    results.forEach((result: MainTeam) => {
      total += result.mainGoals - result.subGoals;
    });
    return total;
  };

  protected efficiency = (results: MainTeam[]) => {
    const result = ((this.totalPoints(results) / (results.length * 3)) * 100).toFixed(2);
    return result;
  };
}

export default MainLeaderBoard;
