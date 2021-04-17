const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFlashcardsForSection, getSection } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res) {
  const { sectionId } = req.params;

  let mastered;
  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  let flashcardsForSection = await getFlashcardsForSection(sectionId, mastered);

  sendResponse(res, 200, { flashcards: flashcardsForSection });
});
