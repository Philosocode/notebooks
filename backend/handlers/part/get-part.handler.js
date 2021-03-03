const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getParts } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res) {
  const { materialId, partId } = req.params;

  const partRes = await getParts(materialId, { id: partId });
  const part = partRes[0];

  sendResponse(res, 200, { part });
});
