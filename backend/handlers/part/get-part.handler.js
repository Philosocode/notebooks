const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getPart, userOwnsPart } = require("../../models/part.model");
const AppError = require("../../utils/app-error.util");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  if (!partId) return next(new AppError("Please include a part ID.", 422));

  if (!userOwnsPart(partId, req.user.id)) {
    return next(new AppError("Part with that ID not found.", 404));
  }

  const part = await getPart(partId);

  sendResponse(res, 200, { part });
});
