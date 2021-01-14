const pino = require("pino");

const pinoLogger = pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: true,
});

// logger. Accessible using req.log.<level>("msg");
const expressLogger = require("express-pino-logger")({
  logger: pinoLogger,
});

module.exports = expressLogger.logger;
