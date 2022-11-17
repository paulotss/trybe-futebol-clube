import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import matchesController from '../controller/matches.controller';
import verifyTeam from '../middlewares/verifyTeam';

const route = Router();

route.get('/', matchesController.getAllMatches);
route.post('/', validateToken, verifyTeam, matchesController.insertMatch);
route.patch('/:id/finish', matchesController.updateMatchInProgress);

export default route;
