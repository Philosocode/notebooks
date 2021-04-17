const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptConceptLinks, deleteConceptConceptLink } = require("../../models/concept-concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { linkId } = req.params;

  const existingConceptConceptLink = await getConceptConceptLinks(userId, { id: linkId });
  if (existingConceptConceptLink.length === 0) {
    return next(new AppError("Concept link to delete doesn't exist."), 404);
  }

  await deleteConceptConceptLink(linkId);

  sendResponse(res, 204);
});
