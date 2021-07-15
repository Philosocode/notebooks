const catchAsync = require("../middlewares/catch-async.middleware");
const logger = require("../utils/logger.util");
const { createUser } = require("../user/user.model");
const { entityExists } = require("../common/common.model");
const { createToken, hashPassword } = require("../utils/auth.util");
const { sendResponse } = require("../common/send-response.util");

module.exports = catchAsync(async function register(req, res, next) {
  const { name, email, password } = req.body;

  // TODO: Properly validate password
  if (!password.trim() || password.trim().length < 8) {
    return sendResponse(res, 422, null, "Password must be at least 8 characters long");
  }

  // check if user already exists
  const userExists = await entityExists("user", { email });

  if (userExists) {
    return sendResponse(res, 409, null, "User with that email already exists");
  }

  // hash the password
  const hashedPassword = hashPassword(password);

  // create the user
  const rows = await createUser(name, email, hashedPassword);
  const userId = rows[0];

  // send data back
  const user = { id: userId, name, email };
  const token = await createToken(user);

  console.log("TOKEN", token);

  logger.info(`Email/Password Login: Name: ${name}, Email: ${email}`);

  sendResponse(res, 200, {
    user,
    token,
  });
});