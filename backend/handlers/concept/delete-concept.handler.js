const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteConcept } = require("../../models/concept.model");
const AppError = require("../../utils/app-error.util");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  if (!conceptId) {
    return next(new AppError("Please include ID of concept to delete."));
  }

  await deleteConcept(userId, conceptId);

  sendResponse(res, 204);
});