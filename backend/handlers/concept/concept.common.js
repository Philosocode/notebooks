const AppError = require("../../utils/app-error.util");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { conceptExists } = require("../../models/concept.model");

// use on concept routes that take a :conceptId param
exports.conceptExistsMiddleware = catchAsync(async function conceptExistsMiddleware(req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const exists = await conceptExists(userId, { id: conceptId });
  if (!exists) {
    return next(new AppError("Concept not found.", 404));
  }

  return next();
});