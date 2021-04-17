const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFlashcardsForPart, getPart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  let mastered;
  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  let flashcardsForPart = await getFlashcardsForPart(partId, mastered);

  sendResponse(res, 200, { flashcards: flashcardsForPart });
});
