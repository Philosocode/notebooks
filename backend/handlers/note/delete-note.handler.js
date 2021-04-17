const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteNote } = require("../../models/note.model");

module.exports = catchAsync(async function (req, res) {
  const { sectionId, noteId } = req.params;

  await deleteNote(sectionId, noteId);

  sendResponse(res, 204);
});
