const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFlashcardsForUser } = require("../../models/flashcard.model");

module.exports = catchAsync(async function (req, res) {
  let mastered;

  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  const flashcards = await getFlashcardsForUser(req.user.id, mastered);

  sendResponse(res, 200, { flashcards });
});
