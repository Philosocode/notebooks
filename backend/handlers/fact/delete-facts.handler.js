const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteFacts } = require("../../models/fact.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  await deleteFacts(partId);

  sendResponse(res, 204);
});
