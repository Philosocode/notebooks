const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../common/common.model");
const { updateFlashcard } = require("../../models/flashcard.model");
const { getValidInsertPosition } = require("../../common/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const { sectionId, flashcardId } = req.params;

  // validations
  const flashcardExists = await entityExists("flashcard", { section_id: sectionId, id: flashcardId });
  if (!flashcardExists) {
    return next(new AppError("Flashcard with that ID not found.", 404));
  }

  // check if at least 1 update-able property included
  const { question, answer, mastered, position } = req.body;
  if (!question && !answer && mastered === undefined && typeof position !== "number") {
    return next(
      new AppError("Allowed properties for update: question, answer, mastered, position.", 422)
    );
  }

  if (question) {
    if (typeof(question) !== "string") {
      return next(new AppError("Question must be a string.", 422));
    }
  }

  if (answer) {
    if (typeof(answer) !== "string") {
      return next(new AppError("Answer must be a string.", 422));
    }
  }

  if (mastered !== undefined) {
    if (typeof(mastered) !== "boolean") {
      return next(new AppError("Mastered must be a boolean.", 422));
    }
  }

  // clean user input
  const updates = {};

  if (question)               updates.question = question;
  if (answer)                 updates.answer = answer;
  if (mastered !== undefined) updates.mastered = mastered;

  if (typeof position === "number") {
    updates.position = await getValidInsertPosition(
      "flashcard", 
      { section_id: sectionId }, 
      position,
      false
    );
  }

  await updateFlashcard(sectionId, flashcardId, updates);

  sendResponse(res, 204);
});
