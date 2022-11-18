import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import UserService from '../service/user.service';

class UserController {
  private userService: UserService;
  private dataToken: JwtPayload | string;

  constructor() {
    this.userService = new UserService();
  }

  public userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    const result = await this.userService.userLogin(email, password);
    res.status(this.userService.code).json(result);
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    const result = this.userService.jwtVerify(token);
    if (!result) return res.status(401).json({ message: 'Token must be a valid token' });
    this.dataToken = result;
    next();
  };

  public getDataToken = (_req: Request, res: Response) => {
    if (typeof this.dataToken === 'string') return res.sendStatus(500);
    res.status(200).json({ role: this.dataToken.role });
  };
}

export default UserController;
