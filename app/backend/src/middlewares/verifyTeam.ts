import { Request, Response, NextFunction } from 'express';
import teamsService from '../service/teams.service';

const verifyTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam && awayTeam) {
    const team1 = await teamsService.getOneTeam(Number(homeTeam));
    const team2 = await teamsService.getOneTeam(Number(awayTeam));
    if (!team1 && !team2) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return next();
  }
  next();
};

export default verifyTeam;
