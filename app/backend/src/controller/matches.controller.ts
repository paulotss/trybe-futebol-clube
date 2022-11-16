import { Request, Response } from 'express';
import matchesService from '../service/matches.service';

const getAllMatches = async (req: Request, res: Response) => {
  const matches = await matchesService.getAllMatches();
  res.status(matches.code).json(matches.payload);
};

export default {
  getAllMatches,
};
