const sendResponse = require("../handlers/response.handler");
const catchAsync = require("../middlewares/catch-async.middleware");
const { getConcepts } = require("./concept.model");
const { mergeEntityWithTags } = require("../handlers/tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  // include tags & links if query params passed
  const options = {
    include: {
      tags: "tags" in req.query,
    },
    filter: {
      "concept.id": conceptId,
    }
  }

  const conceptFlat = await getConcepts(userId, options);
  const conceptMerged = mergeEntityWithTags(conceptFlat)[0];

  sendResponse(res, 200, {
    concept: conceptMerged
  });
});
