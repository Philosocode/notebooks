const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createConcept } = require("../../models/concept.model");
const { entityExists } = require("../../models/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { name, tags } = req.body;

  // Validations: name not empty, concept with that name doesn't already exist
  if (!name.trim()) {
    return next(new AppError("Must include a name when adding a concept", 422));
  }

  const exists = await entityExists("concept", { name, user_id: userId });
  if (exists) {
    return next(new AppError("Concept with that name already exists", 409));
  }

  const createdConcept = await createConcept(userId, name, tags);

  sendResponse(res, 201, {
    concept: createdConcept 
  });
});
