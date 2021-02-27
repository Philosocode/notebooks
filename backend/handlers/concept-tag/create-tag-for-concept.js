const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createTagForEntity, entityHasTag } = require("../../models/entity-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;
  const { tag } = req.body;

  const tagLower = tag.trim().toLowerCase();

  // validations
  if (!tagLower) {
    return next(new AppError("Must include a tag to add.", 422));
  }

  if (await entityHasTag("concept", conceptId, tagLower)) {
    return next(new AppError("Concept already has that tag.", 409));
  }

  await createTagForEntity("concept", conceptId, tagLower);

  sendResponse(res, 201, {
    data: { tag: tagLower },
    message: "Successfully added tag to concept",
  });
});
