const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");
const { createConceptLink } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptIds } = req.body;

  // validation: array with two items
  if (!Array.isArray(conceptIds) || conceptIds.length !== 2) {
    return next(new AppError("conceptIds must be an array with 2 concept IDs"), 422);
  }

  // both concepts must exist
  const concept1Exists = await entityExists("concept", { id: conceptIds[0], user_id: userId });
  const concept2Exists = await entityExists("concept", { id: conceptIds[1], user_id: userId });

  if (!concept1Exists || !concept2Exists) {
    return next(new AppError("conceptIds must contain IDs of concepts that actually exist."), 404);
  }

  const conceptLinkResult = await createConceptLink(conceptIds[0], conceptIds[1]);
  const conceptLink = conceptLinkResult[0];

  sendResponse(res, 201, {
    conceptLink,
  });
});
