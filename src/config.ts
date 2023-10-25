import dotenv from 'dotenv'
import { LogLevel } from 'fastify'

dotenv.config()

// types
type NodeEnv = 'production' | 'development' | 'test'
type LogOpts = {
  level: LogLevel
  transport?: {
    target: "pino-pretty"
    options: {
      translateTime: "HH:MM:ss Z"
      ignore: "pid,hostname"
    }
  }
}
type LoggingOpts = {
  [K in NodeEnv]: LogOpts
}

// config values
const port: number = Number(process.env.PORT) || 1443
const nodeEnv: NodeEnv = (process.env.NODE_ENV as NodeEnv) || "production"
const logLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info"

// TODO refactor `transport` to git rid of NODE_ENV and use if(process.stdout.isTTY) instead
const loggingOptions: LoggingOpts = {
  development: {
    level: logLevel,
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: {
    level: logLevel,
  },
  test: {
    level: 'silent',
  },
}
const logging = loggingOptions[nodeEnv]

export default {
  port,
  logging,
  nodeEnv,
}
