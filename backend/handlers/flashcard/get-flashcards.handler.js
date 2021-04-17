const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFlashcards } = require("../../models/flashcard.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  const flashcards = await getFlashcards(partId);

  sendResponse(res, 200, { flashcards });
});
