import { Router } from 'express';
import matchesController from '../controller/matches.controller';

const route = Router();

route.get('/', matchesController.getAllMatches);

export default route;
