const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getNotes } = require("../../models/note.model");

module.exports = catchAsync(async function (req, res) {
  const { partId, noteId } = req.params;

  if (!noteId) return next(new AppError("Please include a note ID.", 422));

  const noteResult = await getNotes(partId, { id: noteId });

  if (noteResult.length === 0) {
    return sendResponse(res, 404, null, "Note with that ID not found.");
  }

  const note = noteResult[0];

  sendResponse(res, 200, { note });
});
