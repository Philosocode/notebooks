const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteParts } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId } = req.params;

  await deleteParts(materialId);

  sendResponse(res, 204);
});
