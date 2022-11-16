import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import matchesController from '../controller/matches.controller';

const route = Router();

route.get('/', matchesController.getAllMatches);
route.post('/', validateToken, matchesController.insertMatch);

export default route;
