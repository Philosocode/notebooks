const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { conceptHasTag, deleteTagFromConcept } = require("../../models/concept-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId, tagName } = req.params;

  // validations
  const tagLower = tagName.trim().toLowerCase();
  if (!tagLower) return next(new AppError("Please include a tag to delete.", 422));

  const tagAlreadyAdded = await conceptHasTag(conceptId, tagLower);
  if (!tagAlreadyAdded) return next(new AppError("Tag for concept not found.", 409));

  await deleteTagFromConcept(conceptId, tagLower);

  sendResponse(res, 204);
});