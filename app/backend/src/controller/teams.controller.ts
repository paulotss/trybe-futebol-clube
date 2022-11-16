import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

const getTeams = async (req: Request, res: Response) => {
  const teams = await teamsService.getTeams();
  res.status(teams.code).json(teams.payload);
};

export default {
  getTeams,
};
