const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");
const { conceptLinkExists, deleteConceptLink } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { linkId } = req.params;

  const exists = await conceptLinkExists();
  if (exists) {
    return next(new AppError("Concept link with those IDs already exists."));
  }

  await deleteConceptLink(linkId);

  sendResponse(res, 204);
});
