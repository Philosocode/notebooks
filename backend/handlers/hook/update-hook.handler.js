const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../common/common.model");
const { updateHook } = require("../../models/hook.model");
const { trimString } = require("../../utils/string.util");
const { getValidInsertPosition } = require("./hook.common");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId, hookId } = req.params;

  // validations
  const hookExists = await entityExists("hook", { concept_id: conceptId, id: hookId });
  if (!hookExists) {
    return next(new AppError("Hook with that ID not found.", 404));
  }

  // check if at least 1 update-able property included
  const { name, content, position } = req.body;
  if (!name && !content && typeof position !== "number") {
    return next(
      new AppError("Allowed properties for update: name, content, position.", 422)
    );
  }

  if (name?.trim() === "") {
    return next(new AppError("Name must not be empty.", 422));
  }

  if (content?.trim() === "") {
    return next(new AppError("Content must not be empty.", 422));
  }

  // clean user input
  const updates = {};

  if (name)     updates.name = trimString(name.trim(), 100).trim();
  if (content)  updates.content = content.trim();

  if (typeof position === "number") {
    updates.position = await getValidInsertPosition(conceptId, position, false);
  }

  await updateHook(conceptId, hookId, updates);

  sendResponse(res, 204);
});
