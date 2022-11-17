import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const { authorization } = req.headers;
  if (authorization) {
    try {
      jwt.verify(authorization, secret);
      return next()
    } catch(err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
  res.status(401).json({ message: 'Token must be a valid token' });
};

export default validateToken;
