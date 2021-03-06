const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { trimString } = require("../../utils/string.util");
const { createSection } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId } = req.params;
  const { name, content } = req.body;

  // Validations: name not empty, concept with that name doesn't already exist
  if (typeof(name) !== "string") {
    return next(new AppError("Name must be a string.", 422));
  }

  if (typeof(content) !== "string") {
    return next(new AppError("Content must be a string.", 422));
  }

  // name has a max length of 100 chars
  const trimmedName = trimString(name, 100);
  const createdSection = await createSection(partId, trimmedName, content);

  sendResponse(res, 201, {
    section: createdSection,
  });
});
