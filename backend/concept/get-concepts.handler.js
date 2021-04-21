const { getConcepts } = require("./concept.model");
const sendResponse = require("../handlers/response.handler");
const catchAsync = require("../middlewares/catch-async.middleware");
const { mergeEntityWithTags } = require("../handlers/tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;

  const options = {
    include: {
      tags: "tags" in req.query,
    }
  };

  const conceptsFlat = await getConcepts(userId, options);
  const conceptsMerged = mergeEntityWithTags(conceptsFlat);

  sendResponse(res, 200, { concepts: conceptsMerged });
});