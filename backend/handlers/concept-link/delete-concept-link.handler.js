const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptLinks, deleteConceptLink } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { linkId } = req.params;

  const existingConceptLink = await getConceptLinks(userId, { id: linkId });
  if (existingConceptLink.length === 0) {
    return next(new AppError("Concept link to delete doesn't exist."), 404);
  }

  await deleteConceptLink(linkId);

  sendResponse(res, 204);
});
