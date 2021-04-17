const catchAsync = require("./catch-async.middleware");
const AppError = require("../utils/app-error.util");
const { userOwnsSection } = require("../models/section.model");

module.exports = catchAsync(async function(req, res, next) {
  const { sectionId } = req.params;

  if (!sectionId) {
    return next(new AppError("Section ID is required.", 422));
  }

  const userId = req.user.id;
  const owns = await userOwnsSection(sectionId, userId);

  if (!owns) {
    return next(new AppError("Section with that ID not found.", 404));
  }

  return next();
});