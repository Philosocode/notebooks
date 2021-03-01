const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { entityExists } = require("../../models/common.model");
const { updatePart } = require("../../models/part.model");
const { trimString } = require("../../utils/string.util");
const { getValidInsertPosition } = require("../../models/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId, partId } = req.params;

  // validations
  const partExists = await entityExists("part", { material_id: materialId, id: partId });
  if (!partExists) {
    return next(new AppError("Part with that ID not found.", 404));
  }

  // check if at least 1 update-able property included
  const { name, position } = req.body;
  if (!name && typeof position !== "number") {
    return next(
      new AppError("Allowed properties for update: name, position.", 422)
    );
  }

  if (name?.trim() === "") {
    return next(new AppError("Name must not be empty.", 422));
  }

  // clean user input
  const updates = {};

  if (name) {
    updates.name = trimString(name.trim(), 100);
  }

  if (typeof position === "number") {
    updates.position = await getValidInsertPosition(
      "part",
      { material_id: materialId },
      position,
      false
    );
  }

  await updatePart(materialId, partId, updates);

  sendResponse(res, 204);
});
