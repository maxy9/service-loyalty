"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// config values
var port = Number(process.env.PORT) || 1443;
var nodeEnv = process.env.NODE_ENV || "production";
var logLevel = process.env.LOG_LEVEL || "info";
var loggingOptions = {
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
};
var logging = loggingOptions[nodeEnv];
exports.default = {
    port: port,
    logging: logging,
    nodeEnv: nodeEnv,
};
