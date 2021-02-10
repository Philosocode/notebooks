const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getHooks } = require("../../models/hook.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;

  const hooks = await getHooks(conceptId);

  sendResponse(res, 200, {
    hooks,
  });
});
