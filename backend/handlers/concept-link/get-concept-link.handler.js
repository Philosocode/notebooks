const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { getConceptLinks } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { linkId } = req.params;

  const conceptLinkResult = await getConceptLinks(userId, { id: linkId });
  if (conceptLinkResult.length === 0) {
    return next(new AppError("Concept link with that ID not found.", 404));
  }

  const conceptLink = conceptLinkResult[0];

  sendResponse(res, 200, { conceptLink });
});
