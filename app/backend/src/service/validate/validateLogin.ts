import schema from './schema';

type login = {
  email: string,
  password: string
};

const validateLogin = ({ email, password }: login) => schema.validate({ email, password });

export default validateLogin;
