import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../utils/jwtToken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const result = jwtVerify(authorization);
    if (typeof result !== 'string') return next();
  }
  res.status(401).json({ message: 'Token must be a valid token' });
};

export default validateToken;
