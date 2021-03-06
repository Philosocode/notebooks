const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deletePart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId } = req.params;

  await deletePart(partId);

  sendResponse(res, 204);
});