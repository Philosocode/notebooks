const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");
const AppError = require("../../utils/app-error.util");
const { deletePart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId, partId } = req.params;

  if (!partId) return next(new AppError("Please include a part ID.", 422));

  const exists = await entityExists("part", { material_id: materialId, id: partId });
  if (!exists) return next(new AppError("Part with that ID not found.", 404));

  await deletePart(materialId, partId);

  sendResponse(res, 204);
});