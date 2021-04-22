const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createHook } = require("../../models/hook.model");
const { trimString } = require("../../utils/string.util");
const { getValidInsertPosition } = require("../../common/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;
  const { name, content, position } = req.body;

  // Validations: name not empty, concept with that name doesn't already exist
  if (!name?.trim()) {
    return next(new AppError("Must include a name when creating a hook.", 422));
  }

  if (!content?.trim()) {
    return next(new AppError("Must include content when creating a hook.", 422));
  }

  if (typeof position !== "number") {
    return next(new AppError("Position must be a number.", 422));
  }

  // name has a max length of 100 chars
  const trimmedName = trimString(name, 100);
  const insertPosition = await getValidInsertPosition(
    "hook",
    { "concept_id": conceptId },
    position,
    true);
  const createdHook = await createHook(conceptId, trimmedName, content, insertPosition);

  sendResponse(res, 201, {
    hook: createdHook,
  });
});
