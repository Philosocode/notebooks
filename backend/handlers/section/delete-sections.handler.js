const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteSections } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res, next) {
  const { notebookId } = req.params;

  await deleteSections(notebookId);

  sendResponse(res, 204);
});
