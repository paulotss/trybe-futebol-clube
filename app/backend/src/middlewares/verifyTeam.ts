import { Request, Response, NextFunction } from 'express';
import TeamService from '../service/team.service';

const teamService = new TeamService();

const verifyTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam && awayTeam) {
    const team1 = await teamService.getOneTeam(Number(homeTeam));
    const team2 = await teamService.getOneTeam(Number(awayTeam));
    if (!team1 || !team2) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return next();
  }
  next();
};

export default verifyTeam;
