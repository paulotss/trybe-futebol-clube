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

  abstract generateLeaderBoard(): Promise<LeaderBoard[]>;
  abstract getMatchesByTeamId(id: number): Match[];
  abstract generateMainTeams(matches: Match[], id?: number): MainTeam[];

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
