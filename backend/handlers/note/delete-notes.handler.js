const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteNotes } = require("../../models/note.model");

module.exports = catchAsync(async function (req, res) {
  const { sectionId } = req.params;

  await deleteNotes(sectionId);

  sendResponse(res, 204);
});
