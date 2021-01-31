const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteConcept, getConcept } = require("../../models/concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const concept = await getConcept({ user_id: userId, id: conceptId });

  if (!concept) {
    return next(new AppError("Concept not found.", 404));
  }
  
  await deleteConcept(userId, conceptId);

  sendResponse(res, 204);
});