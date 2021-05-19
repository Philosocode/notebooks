const logger = require("../utils/logger.util");

module.exports = function(req, _, next) {
  let logString = "";

  if (req.user) {
    logString = `[${req.user.id}] `;
  }

  logString += `${req.method} ${req.url}`;

  logger.info(logString);

  return next();
};