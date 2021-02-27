const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityHasTag, deleteTagFromEntity } = require("../../models/entity-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId, tagName } = req.params;

  // validations
  const tagLower = tagName.trim().toLowerCase();
  if (!tagLower) return next(new AppError("Please include a tag to delete.", 422));

  const tagAlreadyAdded = await entityHasTag("material", materialId, tagLower);
  if (!tagAlreadyAdded) return next(new AppError("Tag for material not found.", 409));

  await deleteTagFromEntity("material", materialId, tagLower);

  sendResponse(res, 204);
});