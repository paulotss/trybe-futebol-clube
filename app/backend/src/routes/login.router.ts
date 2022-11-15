import { Router } from 'express';
import UserController from '../controller/user.controller';

const route = Router();

route.post('/', UserController.userLogin);
route.get('/validate', UserController.validateRole);

export default route;
