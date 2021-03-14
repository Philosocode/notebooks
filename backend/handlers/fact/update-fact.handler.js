const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");
const { updateFact } = require("../../models/fact.model");
const { getValidInsertPosition } = require("../../models/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId, factId } = req.params;

  // validations
  const factExists = await entityExists("fact", { part_id: partId, id: factId });
  if (!factExists) {
    return next(new AppError("Fact with that ID not found.", 404));
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
      "fact", 
      { part_id: partId }, 
      position,
      false
    );
  }

  await updateFact(partId, factId, updates);

  sendResponse(res, 204);
});
