export interface Payload {
  message?: string;
  token?: string;
}

export interface MainTeam {
  mainGoals: number;
  subGoals: number;
}

export interface LeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
