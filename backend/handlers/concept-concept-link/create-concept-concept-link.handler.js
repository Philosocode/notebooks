const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../common/common.model");
const { conceptConceptConceptLinkExists, createConceptConceptLink } = require("../../models/concept-concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptIds } = req.body;

  // validation: array with two items
  if (!Array.isArray(conceptIds) || conceptIds.length !== 2) {
    return next(new AppError("conceptIds must be an array with 2 concept IDs", 422));
  }

  if (conceptIds[0].trim() === conceptIds[1].trim()) {
    return next(new AppError("Concept IDs must be different.", 422));
  }

  // both concepts must exist
  const concept1Exists = await entityExists("concept", { id: conceptIds[0], user_id: userId });
  const concept2Exists = await entityExists("concept", { id: conceptIds[1], user_id: userId });

  if (!concept1Exists || !concept2Exists) {
    return next(new AppError("conceptIds must contain IDs of concepts that actually exist."), 404);
  }

  const exists = await conceptConceptLinkExists(conceptIds);
  if (exists) {
    return next(new AppError("Concept link with those IDs already exists."));
  }

  const conceptConceptLinkResult = await createConceptConceptLink(conceptIds);
  const conceptConceptLink = conceptConceptLinkResult[0];

  sendResponse(res, 201, {
    conceptConceptLink,
  });
});
