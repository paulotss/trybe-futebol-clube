import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UsersModel';
import 'dotenv';

const jwtToken = (data: Users) => {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const token = jwt.sign({ data }, secret, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
  return token;
};

export default jwtToken;
