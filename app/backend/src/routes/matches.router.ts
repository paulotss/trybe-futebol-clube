import { Router } from 'express';
import MatchController from '../controller/match.controller';
import UserController from '../controller/user.controller';

const route = Router();

const matchController = new MatchController();
const userController = new UserController();

route.get('/', matchController.getAllMatches);
route.post('/', userController.validateToken, matchController.insertMatch);
route.patch('/:id/finish', matchController.updateMatchInProgress);
route.patch('/:id', matchController.updateMatch);

export default route;
