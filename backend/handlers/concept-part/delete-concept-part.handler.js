const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { conceptPartExists, deleteConceptPart } = require("../../models/concept-part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId, conceptId } = req.params;

  const exists = await conceptPartExists(conceptId, partId);
  if (!exists) {
    return next(new AppError("Concept part not found.", 404));
  }

  await deleteConceptPart(conceptId, partId);

  sendResponse(res, 204);
});
