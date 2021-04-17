const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { getConceptConceptLinks } = require("../../models/concept-concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { linkId } = req.params;

  const conceptConceptLinkResult = await getConceptConceptLinks(userId, { id: linkId });
  if (conceptConceptLinkResult.length === 0) {
    return next(new AppError("Concept link with that ID not found.", 404));
  }

  const conceptConceptLink = conceptConceptLinkResult[0];

  sendResponse(res, 200, { conceptConceptLink });
});
