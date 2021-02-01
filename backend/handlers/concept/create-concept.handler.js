const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createConcept, getConcept } = require("../../models/concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { name, tags } = req.body;

  // Validations
  if (!name) {
    return next(new AppError("Must include a name when adding a concept", 422));
  }

  const existingConcept = await getConcept(userId, { "concept.name": name });
  if (existingConcept) {
    return next(new AppError("Concept with that name already exists", 409));
  }

  const createdConcept = await createConcept(userId, name, tags);

  sendResponse(res, 201, {
    concept: createdConcept 
  });
});
