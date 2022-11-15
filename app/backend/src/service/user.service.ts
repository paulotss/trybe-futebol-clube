import * as bcrypt from 'bcryptjs';
import jwtToken, { jwtVerify } from '../utils/jwtToken';
import Users from '../database/models/UsersModel';
import validateLogin from './validate/validateLogin';

const userLogin = async (email: string, password: string) => {
  const user = await Users.findOne({ where: { email } });
  let result = false;
  const validate = validateLogin({ email, password });
  if (validate.error) return { code: 401, payload: { message: validate.error.message } };
  if (user) {
    result = bcrypt.compareSync(password, user.password);
    if (result) return { code: 200, payload: { token: jwtToken(user) } };
  }
  return { code: 401, payload: { message: 'Incorrect email or password' } };
};

const validateRole = (token: string) => {
  const result = jwtVerify(token);
  if (typeof result === 'string') return { code: 401, payload: result };
  return { code: 200, payload: { role: result.data.role } };
};

export default {
  userLogin,
  validateRole,
};
