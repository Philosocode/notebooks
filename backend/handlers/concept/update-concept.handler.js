const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConcept, updateConcept } = require("../../models/concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  // only property that can be updated
  const name = req.body.name;

  if (!name) {
    return next(
      new AppError("Can only update concept name.", 422)
    );
  }

  const concept = await getConcept(userId, conceptId);

  if (!concept) {
    return next(new AppError("Concept not found.", 404));
  }

  await updateConcept(userId, conceptId, { name });

  sendResponse(res, 204);
});
