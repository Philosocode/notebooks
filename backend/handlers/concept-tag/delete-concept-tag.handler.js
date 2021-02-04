const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { conceptTagExists, deleteConceptTag } = require("../../models/concept-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId, tagName } = req.params;

  if (!tagName) return next(new AppError("Please include a tag to delete.", 422));

  const exists = await conceptTagExists(conceptId, tagName);
  if (!exists) return next(new AppError("Tag for concept not found.", 409));

  await deleteConceptTag(conceptId, tagName);

  sendResponse(res, 204);
});