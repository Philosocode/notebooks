const { getConcept } = require("../../models/concept.model");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  const concept = await getConcept(userId, conceptId);

  if (!concept) {
    return next(new AppError("Concept not found.", 404));
  }

  sendResponse(res, 200, { concept });
});