import { Request, Response } from 'express';
import LeaderBoardService from '../service/leaderboard.service';
import HomeLeaderBoardService from '../service/homeleaderboard.service';
import AwayLeaderBoardService from '../service/awayleaderboard.service';

class LeaderBoardController {
  private leaderBoardService: LeaderBoardService;
  private homeLeaderBoardService: LeaderBoardService;
  private awayLeaderBoardService: LeaderBoardService;

  constructor() {
    this.leaderBoardService = new LeaderBoardService();
    this.homeLeaderBoardService = new HomeLeaderBoardService();
    this.awayLeaderBoardService = new AwayLeaderBoardService();
  }

  public getLeaderBoardService = async (_req: Request, res: Response) => {
    const leaderBoard = await this.leaderBoardService.generateLeaderBoard();
    res.status(200).json(leaderBoard);
  };

  public getHomeLeaderBoardService = async (_req: Request, res: Response) => {
    const leaderBoard = await this.homeLeaderBoardService.generateLeaderBoard();
    res.status(200).json(leaderBoard);
  };

  public getAwayLeaderBoardService = async (_req: Request, res: Response) => {
    const leaderBoard = await this.awayLeaderBoardService.generateLeaderBoard();
    res.status(200).json(leaderBoard);
  };
}

export default LeaderBoardController;
