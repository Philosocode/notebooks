const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getEntityTags } = require("../../models/entity-tag.model");
const { mergeEntityWithTags } = require("../tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const tagsFlat = await getEntityTags("material", req.user.id);
  const tags = mergeEntityWithTags(tagsFlat);

  sendResponse(res, 200, { tags });
});