const { getConceptTags } = require("../../models/concept.model");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const mergeEntityWithTagsAndLinks = require("../../utils/merge-entity-tags-links.util");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;

  const tagsFlat = await getConceptTags(conceptId);
  const tags = mergeEntityWithTagsAndLinks(tagsFlat)[0].tags;

  sendResponse(res, 200, { tags });
});