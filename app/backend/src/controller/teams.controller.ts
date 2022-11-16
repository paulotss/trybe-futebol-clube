import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

const getTeams = async (req: Request, res: Response) => {
  const teams = await teamsService.getTeams();
  res.status(teams.code).json(teams.payload);
};

const getOneTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamsService.getOneTeam(Number(id));
  res.status(team.code).json(team.payload);
};

export default {
  getTeams,
  getOneTeam,
};
