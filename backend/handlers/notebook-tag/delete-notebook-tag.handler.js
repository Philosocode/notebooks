const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteEntityTag, entityTagExists } = require("../../models/entity-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { tagName } = req.params;

  const tagLower = tagName.trim().toLowerCase();
  if (!tagLower) return next(new AppError("Please include a tag to delete.", 422));

  const notebookTagExists = await entityTagExists("notebook", tagLower, req.user.id);
  if (!notebookTagExists) {
    return next(new AppError("Notebook tag not found.", 404));
  }

  await deleteEntityTag("notebook", tagLower, req.user.id);

  sendResponse(res, 204);
});