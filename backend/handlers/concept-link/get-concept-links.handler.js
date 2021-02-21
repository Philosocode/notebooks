const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const AppError = require("../../utils/app-error.util");
const { getConceptLinks } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;

  const conceptLinks = await getConceptLinks(userId);
  if (conceptLinks.length === 0) {
    return next(new AppError("Concept link with that ID not found.", 404));
  }

  sendResponse(res, 200, { conceptLinks });
});
