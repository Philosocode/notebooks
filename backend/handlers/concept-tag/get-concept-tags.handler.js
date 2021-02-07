const { getConceptTags } = require("../../models/concept-tag.model");
const sendResponse = require("../response.handler");
const mergeEntityWithTagsAndLinks = require("../../utils/merge-entity-tags-links.util");
const catchAsync = require("../../middlewares/catch-async.middleware");

module.exports = catchAsync(async function (req, res) {
  const tagsFlat = await getConceptTags(req.user.id);
  const tags = mergeEntityWithTagsAndLinks(tagsFlat);

  sendResponse(res, 200, { tags });
});