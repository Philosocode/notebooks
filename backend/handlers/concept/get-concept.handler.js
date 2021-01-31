const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { getConcepts, conceptExists } = require("../../models/concept.model");
const mergeEntityWithTagsAndLinks = require("../../utils/merge-entity-tags-links.util");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const exists = await conceptExists(userId, { id: conceptId });
  if (!exists) {
    return next(new AppError("Concept not found.", 404));
  }
  
  const conceptFlat = await getConcepts(userId, { "concept.id": conceptId });
  const conceptMerged = mergeEntityWithTagsAndLinks(conceptFlat)[0];

  sendResponse(res, 200, {
    concept: conceptMerged
  });
});
