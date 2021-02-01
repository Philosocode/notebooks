const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConcept, updateConcept, conceptExists } = require("../../models/concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const exists = await conceptExists(userId, { id: conceptId });
  if (!exists) {
    return next(new AppError("Concept not found.", 404));
  }

  // check if update-able properties included
  const { name, tags } = req.body;
  if (!name && !tags) {
    return next(
      new AppError("Allowed properties for update: name, tags.", 422)
    );
  }

  if (tags && !Array.isArray(tags)) {
    return next(
      new AppError("Tags must be an array of strings.", 422)
    );
  }

  const lowercaseTags = tags?.map(tn => tn.toLowerCase());

  await updateConcept(conceptId, { name, tags: lowercaseTags });

  sendResponse(res, 204);
});
