const { OAuth2Client } = require("google-auth-library");

const AppError = require("../utils/app-error.util");
const catchAsync = require("../middlewares/catch-async.middleware");
const db = require("../db/db");
const logger = require("../utils/logger.util");
const { sendResponse } = require("../common/send-response.util");
const { upsertUser, getUser } = require("../user/user.model");
const { createToken } = require("./auth.util");

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

module.exports = catchAsync(async function (req, res, next) {
  const { token } = req.body;

  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
  } catch {
    return next(new AppError("Failed to verify oauth id token", 400));
  }
  
  
  // sub = unique user Google ID
  const {
    sub: google_id,
    name,
    email,
    picture: photo_url,
  } = ticket.getPayload();

  // if user registered with email and password, stop the from continuing
  let userFromDb = await getUser({ email: email.toLowerCase() });
  if (userFromDb?.password) {
    return sendResponse(res, 200, null, "Try logging in with email and password");
  }

  await upsertUser(email, google_id, name, photo_url);

  userFromDb = await getUser({ google_id });

  const user = { id: userFromDb.id, email, google_id, name, photo_url };

  const jwtToken = await createToken({ user });

  logger.info(`Google Login: ${email} [Google ID: ${google_id}]`);

  sendResponse(res, 200, { token: jwtToken, user });
});