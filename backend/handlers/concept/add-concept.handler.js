const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createConcept } = require("../../models/concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Must include a name when adding a concept", 422));
  }

  const created = await createConcept(userId, name)[0];

  sendResponse(res, 201, { concept: created });
});
