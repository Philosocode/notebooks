const catchAsync = require("../../middlewares/catch-async.middleware");
const { getTags } = require("../../models/tag.model");
const sendResponse = require("../response.handler");

module.exports = catchAsync(async function (_, res) {
  const tags = await getTags();

  sendResponse(res, 200, { tags });
});