const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteFlashcards } = require("../../models/flashcard.model");

module.exports = catchAsync(async function (req, res) {
  const { sectionId } = req.params;

  await deleteFlashcards(sectionId);

  sendResponse(res, 204);
});
