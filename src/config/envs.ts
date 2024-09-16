import "dotenv/config"
import * as joi from "joi"

interface EnvVars {
  PORT: number,
  DATABASE_URL: string
}

const envSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
}).unknown(true)

const { error, value: envValues } = envSchema.validate(process.env)

if(error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars = envValues as EnvVars

export const envs = {
  PORT: envVars.PORT,
  DATABASE_URL: envVars.DATABASE_URL
}