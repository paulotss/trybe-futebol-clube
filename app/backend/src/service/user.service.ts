import * as bcrypt from 'bcryptjs';
import jwtToken from '../utils/jwtToken';
import Users from '../database/models/UsersModel';

const userLogin = async (email: string, password: string) => {
  const user = await Users.findOne({ where: { email } });
  let result = false;
  if (user) {
    result = bcrypt.compareSync(password, user.password);
    if (result) return jwtToken(user);
  }
  return result;
};

export default {
  userLogin,
};
