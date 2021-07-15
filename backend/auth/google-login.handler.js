const { OAuth2Client } = require("google-auth-library");

const AppError = require("../utils/app-error.util");
const catchAsync = require("../middlewares/catch-async.middleware");
const db = require("../db/db");
const logger = require("../utils/logger.util");
const { sendResponse } = require("../common/send-response.util");
const { upsertUser } = require("../user/user.model");
const { createToken } = require("../utils/auth.util");

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

  await upsertUser(email, google_id, name, photo_url);

  const userFromDb = await db("user").where({ google_id }).first();

  const user = { id: userFromDb.id, email, google_id, name, photo_url };

  const jwtToken = await createToken({ user });

  logger.info(`Google Login: ${email} [Google ID: ${google_id}]`);

  sendResponse(res, 200, { token: jwtToken, user });
});