const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { deletePart, userOwnsPart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId } = req.params;

  if (!partId) return next(new AppError("Please include a part ID.", 422));

  if (!userOwnsPart(partId, req.user.id)) {
    return next(new AppError("Part with that ID not found.", 404));
  }

  await deletePart(materialId, partId);

  sendResponse(res, 204);
});