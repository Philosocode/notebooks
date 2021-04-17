const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteFlashcards } = require("../../models/flashcard.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  await deleteFlashcards(partId);

  sendResponse(res, 204);
});
