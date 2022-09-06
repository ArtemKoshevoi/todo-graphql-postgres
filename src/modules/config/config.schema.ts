import * as Joi from 'joi';

export const configSchema = Joi.object({
  JWT_SECRET_KEY: Joi.string().required(),

  POSTGRES_HOST: Joi.string().default('localhost').required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
});
