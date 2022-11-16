import { Router } from 'express';
import teamsController from '../controller/teams.controller';

const route = Router();

route.get('/', teamsController.getTeams);

export default route;
