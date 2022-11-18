import { Router } from 'express';
import UserController from '../controller/user.controller';

const route = Router();

const userController = new UserController();

route.post('/', userController.userLogin);
route.get('/validate', userController.validateToken, userController.getDataToken);

export default route;
