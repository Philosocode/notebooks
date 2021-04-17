const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteFlashcard  } = require("../../models/flashcard.model");
const { entityExists } = require("../../models/common.model");
const AppError = require("../../utils/app-error.util");

module.exports = catchAsync(async function (req, res, next) {
  const { partId, flashcardId } = req.params;

  // validations
  if (!partId) return next(new AppError("Please include a part ID.", 422));
  if (!flashcardId) return next(new AppError("Please include a flashcard ID.", 422));

  const exists = await entityExists("flashcard", { part_id: partId, id: flashcardId });
  if (!exists) return next(new AppError("Flashcard with that ID not found.", 404));

  await deleteFlashcard(flashcardId);

  sendResponse(res, 204);
});