const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { conceptHasTag, updateTagForConcept } = require("../../models/concept-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId, tagName } = req.params;
  const { name } = req.body;

  // validation
  if (!tagName) return next(new AppError("Please include a tag to update.", 422));
  if (!name) return next(new AppError("Please include a new name for tag.", 422));

  // can't update tag if it doesn't exist
  const oldTagExists = await conceptHasTag(conceptId, tagName.toLowerCase());
  if (!oldTagExists) return next(new AppError("Concept tag to update was not found.", 409));

  // can't rename to an existing tag
  const newTagExists = await conceptHasTag(conceptId, name.toLowerCase());
  if (newTagExists) return next(new AppError("Concept tag with that name already exists.", 409));

  await updateTagForConcept(conceptId, tagName, name);

  sendResponse(res, 204);
});