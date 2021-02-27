const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createTagForEntity, entityHasTag } = require("../../models/entity-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId } = req.params;
  const { tag } = req.body;

  const tagLower = tag.trim().toLowerCase();

  // validations
  if (!tagLower) {
    return next(new AppError("Must include a tag to add.", 422));
  }

  if (await entityHasTag("material", materialId, tagLower)) {
    return next(new AppError("Material already has that tag.", 409));
  }

  await createTagForEntity("material", materialId, tagLower);

  sendResponse(res, 201, {
    data: { tag: tagLower },
    message: "Successfully added tag to material",
  });
});
