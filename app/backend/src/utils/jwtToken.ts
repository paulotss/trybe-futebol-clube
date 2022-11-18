import * as jwt from 'jsonwebtoken';
import Users from '../database/models/user.model';
import 'dotenv';

const jwtToken = (data: Users) => {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const token = jwt.sign({ data }, secret, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
  return token;
};

export const jwtVerify = (token: string) => {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const result = jwt.verify(token, secret);
  return result;
};

export default jwtToken;
