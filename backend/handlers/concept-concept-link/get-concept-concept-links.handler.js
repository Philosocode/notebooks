const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { getConceptConceptLinks } = require("../../models/concept-concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;

  const conceptConceptLinks = await getConceptConceptLinks(userId);
  if (conceptConceptLinks.length === 0) {
    return next(new AppError("Concept link with that ID not found.", 404));
  }

  sendResponse(res, 200, { conceptConceptLinks });
});
