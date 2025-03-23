import "dotenv/config"
import * as joi from "joi"

interface EnvVars {
  PORT: number,
  JWT_SECRET: string
  DATABASE_URL: string
  ALLOWED_ORIGINS: string[],
  EMAIL_USERNAME: string,
  EMAIL_PASSWORD: string
  EMAIL_HOST: string,
  EMAIL_PORT: number,
  FRONTEND_URL: string
}

const envSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  DATABASE_URL: joi.string().required(),
  ALLOWED_ORIGINS: joi.array().items(joi.string()).required()
}).unknown(true)

const { error, value: envValues } = envSchema.validate({
  ...process.env,
  ALLOWED_ORIGINS: process.env?.ALLOWED_ORIGINS.split(",")
})

if(error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars = envValues as EnvVars

export const envs = {
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
  DATABASE_URL: envVars.DATABASE_URL,
  ALLOWED_ORIGINS: envVars.ALLOWED_ORIGINS,
  EMAIL_USERNAME: envVars.EMAIL_USERNAME,
  EMAIL_PASSWORD: envVars.EMAIL_PASSWORD,
  EMAIL_HOST: envVars.EMAIL_HOST,
  EMAIL_PORT: envVars.EMAIL_PORT,
  FRONTEND_URL: envVars.FRONTEND_URL
}