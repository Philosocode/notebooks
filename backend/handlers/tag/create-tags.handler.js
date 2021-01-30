const { createTags } = require("../../models/tag.model");
const catchAsync = require("../../middlewares/catch-async.middleware");
const sendResponse = require("../response.handler");

module.exports = catchAsync(async function (req, res) {
  const { tags } = req.body;

  const createdTags = await createTags(tags);

  sendResponse(res, 201, createdTags);
});