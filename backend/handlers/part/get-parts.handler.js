const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getParts } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId } = req.params;

  const parts = await getParts(materialId);

  sendResponse(res, 200, { parts });
});
