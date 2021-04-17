const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFlashcardsForNotebook } = require("../../models/notebook.model");

module.exports = catchAsync(async function (req, res) {
  const { notebookId } = req.params;

  let mastered;
  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  const flashcardsForNotebook = await getFlashcardsForNotebook(notebookId, mastered);

  sendResponse(res, 200, { flashcards: flashcardsForNotebook });
});
