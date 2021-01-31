const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { getConcept } = require("../../models/concept.model");
const { getTagsForConcept } = require("../../models/tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const concept = await getConcept(userId, { id: conceptId });

  if (!concept) {
    return next(new AppError("Concept not found.", 404));
  }

  const tagsForConcept = await getTagsForConcept(conceptId);
  const tagNames = tagsForConcept.map(ct => ct.name);

  sendResponse(res, 200, {
    concept: {
      ...concept,
      tags: tagNames,
    },
  });
});
