const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getNotes } = require("../../models/note.model");

module.exports = catchAsync(async function (req, res) {
  const { sectionId } = req.params;

  const notes = await getNotes(sectionId);

  sendResponse(res, 200, { notes });
});
