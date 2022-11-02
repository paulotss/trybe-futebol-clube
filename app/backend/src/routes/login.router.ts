import { Router } from 'express';
import UserController from '../controller/user.controller';

const route = Router();

route.post('/', UserController.userLogin);

export default route;
