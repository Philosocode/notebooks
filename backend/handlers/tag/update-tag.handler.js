const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getTag, updateTag } = require("../../models/tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { tagId } = req.params;
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Please include a name.", 422));
  }

  const tag = await getTag(tagId);

  if (!tag) {
    return next(new AppError("Tag not found.", 404));
  }

  await updateTag(tagId, { name });

  sendResponse(res, 204);
});
