const { validationResult } = require("express-validator");

const { sendResponse }  = require("./send-response.util");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  sendResponse(res, 422, { errors: extractedErrors });
}