import { Request, Response } from 'express';
import UserService from '../service/user.service';

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  const result = await UserService.userLogin(email, password);
  if (result) return res.status(200).json({ token: result });
  res.sendStatus(404);
};

export default {
  userLogin,
};