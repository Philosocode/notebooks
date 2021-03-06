const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");
const { updateSection } = require("../../models/section.model");
const { trimString } = require("../../utils/string.util");
const { getValidInsertPosition } = require("../../models/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId, sectionId } = req.params;

  // validations
  const sectionExists = await entityExists("section", { part_id: partId, id: sectionId });
  if (!sectionExists) {
    return next(new AppError("Section with that ID not found.", 404));
  }

  // check if at least 1 update-able property included
  const { name, content, position } = req.body;
  if (!name && !content && typeof position !== "number") {
    return next(
      new AppError("Allowed properties for update: name, content, position.", 422)
    );
  }

  if (name) {
    if (typeof(name) !== "string") {
      return next(new AppError("Name must be a string.", 422));
    }
  }

  if (content) {
    if (typeof(content) !== "string") {
      return next(new AppError("Content must be a string.", 422));
    }
  }

  // clean user input
  const updates = {};

  if (name)     updates.name = trimString(name.trim(), 100).trim();
  if (content)  updates.content = content.trim();

  if (typeof position === "number") {
    updates.position = await getValidInsertPosition(
      "section", 
      { part_id: partId }, 
      position,
      false
    );
  }

  await updateSection(partId, sectionId, updates);

  sendResponse(res, 204);
});
