const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteHooks } = require("../../models/hook.model");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  await deleteHooks(conceptId);

  sendResponse(res, 204);
});