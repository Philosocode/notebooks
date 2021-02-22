const { getTagsForConcept } = require("../../models/concept-tag.model");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { mergeEntityWithTags } = require("../tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const tagsFlat = await getTagsForConcept(conceptId);
  const tags = mergeEntityWithTags(tagsFlat)[0]?.tags ?? [];

  sendResponse(res, 200, { tags });
});