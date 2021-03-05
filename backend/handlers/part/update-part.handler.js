const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { updatePart, userOwnsPart, getPart } = require("../../models/part.model");
const { trimString } = require("../../utils/string.util");
const { getValidInsertPosition } = require("../../models/common.model");
const { partChecklistKeys } = require("./part.common");
const { getMaterials } = require("../../models/material.model");

module.exports = catchAsync(async function (req, res, next) {
  const { partId } = req.params;

  if (!partId) return next(new AppError("Please include a part ID.", 422));

  // check if user owns the part through the material
  const part = await getPart(partId);
  if (!part) return next(new AppError("Part with that ID not found.", 422));
  
  const materialResult = await getMaterials(req.user.id, { id: part.material_id });
  const materialForPart = materialResult[0];

  if (!materialForPart || materialForPart.user_id !== req.user.id) {
    return next(new AppError("Part with that ID not found.", 404));
  }

  // validate properties to update
  const { name, position, checklist } = req.body;
  if (!name && !checklist && typeof position !== "number") {
    return next(
      new AppError("Allowed properties for update: name, position.", 422)
    );
  }

  if (name?.trim() === "") {
    return next(new AppError("Name must not be empty.", 422));
  }

  if (checklist && typeof(checklist) !== "object") {
    return next(new AppError("Checklist must be an object.", 422));
  }

  // clean user input
  const updates = {};

  if (name) {
    updates.name = trimString(name.trim(), 100);
  }

  if (typeof position === "number") {
    updates.position = await getValidInsertPosition(
      "part",
      { material_id: materialForPart.id },
      position,
      false
    );
  }

  if (checklist) {
    const cleanedChecklist = {};

    Object.keys(checklist).forEach(key => {
      // if key is not in partChecklistKeys, ignore
      if (!partChecklistKeys.includes(key)) return;

      // if value is not a boolean, ignore
      if (typeof(checklist[key]) !== "boolean") return;

      cleanedChecklist[key] = checklist[key];
    });

    updates.checklist = cleanedChecklist
  }

  await updatePart(materialForPart.id, partId, updates);

  sendResponse(res, 204);
});
