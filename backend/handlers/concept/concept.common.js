const AppError = require("../../utils/app-error.util");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");

// use on concept routes that take a :conceptId param
exports.conceptExistsMiddleware = catchAsync(async function conceptExistsMiddleware(req, _, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const exists = await entityExists("concept", { id: conceptId, user_id: userId });
  if (!exists) {
    return next(new AppError("Concept not found.", 404));
  }

  return next();
});