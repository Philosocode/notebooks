const { getConceptTags } = require("../../models/concept-tag.model");
const sendResponse = require("../response.handler");
const { mergeEntityWithTags } = require("../tag/tag.common");
const catchAsync = require("../../middlewares/catch-async.middleware");

module.exports = catchAsync(async function (req, res) {
  const tagsFlat = await getConceptTags(req.user.id);
  const tags = mergeEntityWithTags(tagsFlat);

  sendResponse(res, 200, { tags });
});