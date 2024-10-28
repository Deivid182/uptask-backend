import "dotenv/config"
import * as joi from "joi"

interface EnvVars {
  PORT: number,
  DATABASE_URL: string
  ALLOWED_ORIGINS: string[]
}

const envSchema = joi.object({
  PORT: joi.number().required(),
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
  DATABASE_URL: envVars.DATABASE_URL,
  ALLOWED_ORIGINS: envVars.ALLOWED_ORIGINS
}