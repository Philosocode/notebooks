const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { conceptSectionLinkExists, deleteConceptSectionLink } = require("../../models/concept-section-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const { sectionId, conceptId } = req.params;

  const exists = await conceptSectionLinkExists(conceptId, sectionId);
  if (!exists) {
    return next(new AppError("Concept section not found.", 404));
  }

  await deleteConceptSectionLink(conceptId, sectionId);

  sendResponse(res, 204);
});
