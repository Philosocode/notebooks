const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteHook } = require("../../models/hook.model");
const { entityExists } = require("../../models/common.model");
const AppError = require("../../utils/app-error.util");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId, hookId } = req.params;

  if (!hookId) return next(new AppError("Please include a hook ID.", 422));

  const exists = await entityExists("hook", { concept_id: conceptId, id: hookId });
  if (!exists) return next(new AppError("Hook with that ID not found.", 404));

  await deleteHook(conceptId, hookId);

  sendResponse(res, 204);
});