import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../utils/jwtToken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const result = jwtVerify(authorization);
    if (typeof result !== 'string') return next();
  }
  res.sendStatus(401);
};

export default validateToken;
