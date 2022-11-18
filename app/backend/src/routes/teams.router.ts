import { Router } from 'express';
import TeamController from '../controller/team.controller';

const route = Router();

const teamController = new TeamController();

route.get('/', teamController.getAllTeams);
route.get('/:id', teamController.getOneTeam);

export default route;
