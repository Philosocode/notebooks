const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteNotes } = require("../../models/note.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  await deleteNotes(partId);

  sendResponse(res, 204);
});
