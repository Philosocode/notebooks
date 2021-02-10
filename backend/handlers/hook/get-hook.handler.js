const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getHooks } = require("../../models/hook.model");
const AppError = require("../../utils/app-error.util");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId, hookId } = req.params;

  if (!hookId) return next(new AppError("Please include a hook ID.", 422));

  const hooksArr = await getHooks(conceptId, { id: hookId });

  if (hooksArr.length === 0) {
    return sendResponse(res, 404, null, "Hook with that ID not found.");
  }

  const hook = hooksArr[0];

  sendResponse(res, 200, {
    hook,
  });
});
