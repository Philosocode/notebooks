const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteSections } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  await deleteSections(partId);

  sendResponse(res, 204);
});
