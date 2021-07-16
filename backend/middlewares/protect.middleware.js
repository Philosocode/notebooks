const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { getUser } = require("../user/user.model");
const catchAsync = require("./catch-async.middleware");
const AppError = require("../utils/app-error.util");

module.exports = catchAsync(async function protect(req, res, next) {
  let token;

  // Ensure auth header with "Bearer" is present
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You must login to get access.", 401));
  }

  // Decode and verify token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Failed to verify token", 401));
  }

  // Find user
  const user = await getUser({ id: decoded.user.id });
  if (!user) {
    return next(
      new AppError("Can't find user for token.", 401)
    );
  }

  // Grant access
  req.user = user;
  next();
});
