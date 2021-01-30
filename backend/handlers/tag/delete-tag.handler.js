const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");

const { getTag, deleteTag } = require("../../models/tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { tagId } = req.params;

  const tag = await getTag(tagId);

  if (!tag) {
    return next(new AppError("Tag not found.", 404));
  }
  
  await deleteTag(tagId);

  sendResponse(res, 204);
});