const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const AppError = require("../utils/app-error.util");
const catchAsync = require("../middlewares/catch-async.middleware");
const logger = require("../utils/logger.util");
const { entityExists } = require("../common/common.model");

module.exports = catchAsync(async function register(req, res, next) {
  const { name, email, password } = req.body;

  // check if user already exists
  const userExists = await entityExists("user", { email });
  console.log(name, email, password);
  console.log("EXISTS:", userExists);

  res.status(200).json({
    status: "success",
    data: {
      name,
      email,
      password,
    }
  });
});