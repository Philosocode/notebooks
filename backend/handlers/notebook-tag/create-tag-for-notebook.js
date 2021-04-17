const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createTagForEntity, entityHasTag } = require("../../models/entity-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { notebookId } = req.params;
  const { tag } = req.body;

  const tagLower = tag.trim().toLowerCase();

  // validations
  if (!tagLower) {
    return next(new AppError("Must include a tag to add.", 422));
  }

  if (await entityHasTag("notebook", notebookId, tagLower)) {
    return next(new AppError("Notebook already has that tag.", 409));
  }

  await createTagForEntity("notebook", notebookId, tagLower);

  sendResponse(res, 201, {
    data: { tag: tagLower },
    message: "Successfully added tag to notebook",
  });
});
