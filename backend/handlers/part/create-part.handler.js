const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { trimString } = require("../../utils/string.util");
const { createPart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId } = req.params;
  const { name } = req.body;

  // Validations: name not empty
  if (!name?.trim()) {
    return next(new AppError("Must include a name when creating a part.", 422));
  }

  // name has a max length of 100 chars
  const trimmedName = trimString(name, 100);
  const createdPart = await createPart(materialId, trimmedName);

  sendResponse(res, 201, { part: createdPart });
});
