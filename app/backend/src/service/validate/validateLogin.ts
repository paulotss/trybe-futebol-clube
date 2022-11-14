import { User } from '../../interfaces/userInterface';
import schema from './schema';

const validateLogin = ({ email, password }: User) => schema.validate({ email, password });

export default validateLogin;
