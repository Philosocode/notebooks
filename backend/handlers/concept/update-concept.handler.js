const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { updateConcept } = require("../../models/concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;

  // check if update-able properties included
  const { name, tags } = req.body;
  if (!name && !tags) {
    return next(
      new AppError("Allowed properties for update: name, tags.", 422)
    );
  }

  if (tags && !Array.isArray(tags)) {
    return next(
      new AppError("Tags must be an array of strings.", 422)
    );
  }

  const lowercaseTags = tags?.map(tn => tn.toLowerCase());

  await updateConcept(conceptId, { name, tags: lowercaseTags });

  sendResponse(res, 204);
});
