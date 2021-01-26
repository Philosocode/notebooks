const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const AppError = require("../../utils/app-error.util");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { upsertUser } = require("../../models/user.model");
const logger = require("../../utils/logger.util");

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

  const user = { email, google_id, name, photo_url };
  const jwtToken = await createToken({ user });

  logger.info(`Google Login: ${email} [Google ID: ${google_id}]`);

  res.status(200).json({
    status: "success",
    data: {
      token: jwtToken,
      user,
    },
  });
});

async function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // e.g. 90d
    expiresIn: process.env.JWT_EXPIRES_IN + "d",
  });
}