const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createHook } = require("../../models/hook.model");
const { trimString } = require("../../utils/string.util");
const { getValidInsertPosition } = require("./hook.common");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;
  const { title, content, position } = req.body;

  // Validations: name not empty, concept with that name doesn't already exist
  if (!title?.trim()) {
    return next(new AppError("Must include a title when creating a hook.", 422));
  }

  if (!content?.trim()) {
    return next(new AppError("Must include content when creating a hook.", 422));
  }

  if (typeof position !== "number") {
    return next(new AppError("Position must be a number.", 422));
  }

  // title has a max length of 100 chars
  const trimmedTitle = trimString(title, 100);
  const insertPosition = await getValidInsertPosition(conceptId, position, true);
  const createdHook = await createHook(conceptId, trimmedTitle, content, insertPosition);

  sendResponse(res, 201, {
    hook: createdHook,
  });
});
