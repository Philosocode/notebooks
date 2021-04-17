const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteNotebook } = require("../../models/notebook.model");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const { notebookId } = req.params;

  await deleteNotebook(userId, notebookId);

  sendResponse(res, 204);
});