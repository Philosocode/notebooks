const pino = require("pino");
const { EOL } = require("os");

const levelMapping = { 50: "ERROR", 40: "WARNING", 30: "INFO", 20: "DEBUG" };

const pinoLogger = pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: {
    colorize: true
  },
  prettifier: (opts) => {
    return (inputData) => {
      const ts = new Date().toISOString().replace(/T/, " ").replace(/\..+/, " ");

      return `${ts} [${levelMapping[inputData.level].toUpperCase()}]: ${inputData.msg} ${EOL}`;
    }
  }
});

// logger. Accessible using req.log.<level>("msg");
const expressLogger = require("express-pino-logger")({
  logger: pinoLogger,
});

module.exports = expressLogger.logger;
