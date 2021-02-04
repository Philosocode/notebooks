const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConcepts } = require("../../models/concept.model");
const mergeEntityWithTagsAndLinks = require("../../utils/merge-entity-tags-links.util");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const options = {
    include: {
      tags: "tags" in req.query,
      links: "links" in req.query,
    },
    filter: {
      "concept.id": conceptId,
    }
  }

  const conceptFlat = await getConcepts(userId, options);
  const conceptMerged = mergeEntityWithTagsAndLinks(conceptFlat)[0];

  sendResponse(res, 200, {
    concept: conceptMerged
  });
});
