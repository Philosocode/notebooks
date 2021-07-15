const catchAsync = require("../middlewares/catch-async.middleware");
const logger = require("../utils/logger.util");
const { createToken, verifyPassword, hashPassword } = require("../utils/auth.util");
const { getUser } = require("../user/user.model");
const { sendResponse } = require("../common/send-response.util");

module.exports = catchAsync(async function register(req, res) {
  let { email, password } = req.body;

  // check if user exists
  const userForEmail = await getUser({ email });
  if (!userForEmail) return invalidCredentials(res);
  
  // verify passwords match
  const passwordFromDb = userForEmail.password;
  const passwordsMatch = await verifyPassword(password, passwordFromDb);
  if (!passwordsMatch) return invalidCredentials(res);

  // send data back
  const user = {
    id: userForEmail.id,
    name: userForEmail.name,
    email,
    photo_url: userForEmail.photo_url ?? "",
  };
  const token = await createToken(user);

  logger.info(
    `Email/Password Login: Name: ${userForEmail.name}, Email: ${email}`
  );

  sendResponse(res, 200, {
    user,
    token,
  });
});

function invalidCredentials(res) {
  return sendResponse(res, 401, null, "Invalid email or password.");
}
