const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { conceptHasTag, updateTagForConcept } = require("../../models/concept-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId, tagName } = req.params;
  const { name } = req.body;

  const oldTagLower = tagName.trim().toLowerCase();
  const newTagLower = name.trim().toLowerCase();

  // validation
  if (!oldTagLower) return next(new AppError("Please include a tag to update.", 422));
  if (!newTagLower) return next(new AppError("Please include a new name for tag.", 422));

  if (oldTagLower === newTagLower) return next(new AppError("New tag name must be different.", 422));

  // can't update tag if it doesn't exist
  const oldTagExists = await conceptHasTag(conceptId, tagName.toLowerCase());
  if (!oldTagExists) return next(new AppError("Concept tag to update was not found.", 409));

  await updateTagForConcept(conceptId, oldTagLower, newTagLower);

  sendResponse(res, 204);
});