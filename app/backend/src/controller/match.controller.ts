import { Request, Response } from 'express';
import MatchService from '../service/match.service';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.matchService.getByInProgress(inProgress.toString());
      return res.status(this.matchService.code).json(matches);
    }
    const matches = await this.matchService.getAllMatches();
    res.status(this.matchService.code).json(matches);
  };

  public insertMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    this.matchService.ht = Number(homeTeam);
    this.matchService.at = Number(awayTeam);
    this.matchService.htg = Number(homeTeamGoals);
    this.matchService.atg = Number(awayTeamGoals);
    const match = await this.matchService.insertMatch();
    return res.status(this.matchService.code).json(match);
  };

  public updateMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await this.matchService.updateMatchInProgress(Number(id));
    res.status(this.matchService.code).json(response);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeamGoals && awayTeamGoals) {
      this.matchService.htg = homeTeamGoals;
      this.matchService.atg = awayTeamGoals;
      const response = await this.matchService.updateMatch(Number(id));
      return res.status(this.matchService.code).json(response);
    }
    res.sendStatus(404);
  };
}

export default MatchController;
