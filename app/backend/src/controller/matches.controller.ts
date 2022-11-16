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

export default {
  getAllMatches,
};
