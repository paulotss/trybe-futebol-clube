import { Request, Response } from 'express';
import TeamService from '../service/team.service';

class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAllTeams();
    res.status(this.teamService.code).json(teams);
  };

  public getOneTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getOneTeam(Number(id));
    res.status(this.teamService.code).json(team);
  };
}

export default TeamController;
