const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { deletePart, userOwnsPart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId } = req.params;

  await deletePart(materialId, partId);

  sendResponse(res, 204);
});