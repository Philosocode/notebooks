const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createTagForConcept, conceptHasTag } = require("../../models/concept-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;
  const { tag } = req.body;

  if (!tag) {
    return next(new AppError("Must include a tag to add.", 422));
  }

  if (await conceptHasTag(conceptId, tag)) {
    return next(new AppError("Concept already has that tag.", 409));
  }

  await createTagForConcept(conceptId, tag);

  sendResponse(res, 201, {
    data: { tag },
    message: "Successfully added tag to concept",
  });
});
