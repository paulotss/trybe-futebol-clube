import { Request, Response } from 'express';
import matchesService from '../service/matches.service';

const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress) {
    const matches = await matchesService.getByInProgress(inProgress.toString());
    return res.status(matches.code).json(matches.payload);
  }
  const matches = await matchesService.getAllMatches();
  res.status(matches.code).json(matches.payload);
};

const insertMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  if (homeTeam && awayTeam && homeTeamGoals && awayTeamGoals) {
    const match = await matchesService
      .insertMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(match.code).json(match.payload);
  }
  res.sendStatus(401);
};

export default {
  getAllMatches,
  insertMatch,
};
