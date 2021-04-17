const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");
const { conceptSectionLinkExists, createConceptSectionLink } = require("../../models/concept-section-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { sectionId } = req.params;
  const { conceptId } = req.body;

  // validations
  if (typeof(conceptId) !== "string") {
    return next(new AppError("Concept ID must be a string.", 422));
  }

  // concept to link to must exist
  const conceptExists = await entityExists("concept", { id: conceptId, user_id: userId });
  if (!conceptExists) {
    return next(new AppError("Concept with that ID doesn't exist."), 404);
  }

  const exists = await conceptSectionLinkExists(conceptId, sectionId);
  if (exists) {
    return next(new AppError("Concept section already exists."));
  }

  const conceptSectionLinkResult = await createConceptSectionLink(conceptId, sectionId);
  const conceptSectionLink = conceptSectionLinkResult[0];

  sendResponse(res, 201, { conceptSectionLink });
});
