const catchAsync = require("./catch-async.middleware");
const AppError = require("../utils/app-error.util");
const { userOwnsPart } = require("../models/part.model");

module.exports = catchAsync(async function(req, res, next) {
  const { partId } = req.params;

  if (!partId) {
    return next(new AppError("Part ID is required.", 422));
  }

  const userId = req.user.id;
  const owns = await userOwnsPart(partId, userId);

  if (!owns) {
    return next(new AppError("Part with that ID not found.", 404));
  }

  return next();
});