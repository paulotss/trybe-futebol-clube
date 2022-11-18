import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv';
import User from '../database/models/user.model';
import loginSchema from './validate/schemas';
import { Payload } from '../interfaces';

class UserService {
  private email: string;
  private password: string;
  private user: User | null;
  private _code: number;
  private payload: Payload;
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'jwt_secret';
    this._code = 500;
    this.payload = { message: 'Internal Error' };
  }

  public get code() : number {
    return this._code;
  }

  private validateLogin() {
    const validate = loginSchema.validate({ email: this.email, password: this.password });
    if (validate.error) return false;
    return true;
  }

  private checkCrypt(cryptPass: string) {
    const result = bcrypt.compareSync(this.password, cryptPass);
    if (!result) {
      this._code = 401;
      this.payload = { message: 'Incorrect email or password' };
    }
    return result;
  }

  public async userLogin(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.user = await User.findOne({ where: { email: this.email } });

    if (this.user && this.validateLogin()) {
      if (this.checkCrypt(this.user.password)) {
        this._code = 200;
        this.payload = { token: this.jwtToken(this.user.role) };
      }
    } else {
      this._code = 401;
      this.payload = { message: 'Incorrect email or password' };
    }

    return this.payload;
  }

  private jwtToken(role: string) {
    const token = jwt.sign({ role }, this.secret, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    return token;
  }

  public jwtVerify(token: string) {
    try {
      const result = jwt.verify(token, this.secret);
      return result;
    } catch (err) {
      return false;
    }
  }
}

export default UserService;
