import * as Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().regex(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    .error(new Error('Incorrect email or password')),
  password: Joi.string().min(6),
});

export default schema;
