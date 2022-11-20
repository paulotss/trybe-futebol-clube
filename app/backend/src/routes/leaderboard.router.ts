import { Router } from 'express';
import LeaderBoardController from '../controller/leaderboard.controller';

const route = Router();

const leaderBoardController = new LeaderBoardController();

route.get('/home', leaderBoardController.getHomeLeaderBoardService);
route.get('/away', leaderBoardController.getAwayLeaderBoardService);
route.get('/', leaderBoardController.getLeaderBoardService);

export default route;
