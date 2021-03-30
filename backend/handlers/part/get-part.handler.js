const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getPart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  const part = await getPart(partId);

  sendResponse(res, 200, { part });
});
