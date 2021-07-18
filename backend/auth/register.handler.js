const catchAsync = require("../middlewares/catch-async.middleware");
const logger = require("../utils/logger.util");
const { createUser } = require("../user/user.model");
const { entityExists } = require("../common/common.model");
const { createToken, hashPassword } = require("./auth.util");
const { sendResponse } = require("../common/send-response.util");

module.exports = catchAsync(async function register(req, res) {
  let { name, email, password } = req.body;

  name = name.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  if (!name || !email || !password) {
    return sendResponse(res, 422, null, "Please include a name, email, and password");
  }

  // TODO: Properly validate password
  if (password.trim().length < 8) {
    return sendResponse(res, 422, null, "Password must be at least 8 characters long");
  }

  // check if user already exists
  const userExists = await entityExists("user", { email });

  if (userExists) {
    return sendResponse(res, 409, null, "User with that email already exists");
  }

  // hash the password
  const hashedPassword = await hashPassword(password);

  // create the user
  const rows = await createUser(name, email, hashedPassword);
  const userId = rows[0];

  // send data back
  const user = { id: userId, name, email };
  const token = await createToken({ user });

  logger.info(`Email/Password Registration: Name: ${name}, Email: ${email}`);

  sendResponse(res, 200, {
    user,
    token,
  });
});