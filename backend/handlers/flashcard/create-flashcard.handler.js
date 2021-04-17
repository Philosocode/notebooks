const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createFlashcard } = require("../../models/flashcard.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId } = req.params;
  const { question, answer } = req.body;

  // Validations
  if (!question?.trim()) {
    return next(new AppError("Must include a question when creating a flashcard.", 422));
  }

  if (!answer?.trim()) {
    return next(new AppError("Must include an answer when creating a flashcard.", 422));
  }

  // name has a max length of 100 chars
  const createdFlashcard = await createFlashcard(partId, question, answer);

  sendResponse(res, 201, { flashcard: createdFlashcard });
});
