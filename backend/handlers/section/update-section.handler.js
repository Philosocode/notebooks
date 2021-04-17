const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { updateSection, userOwnsSection, getSection } = require("../../models/section.model");
const { trimString } = require("../../utils/string.util");
const { getValidInsertPosition } = require("../../models/common.model");
const { sectionChecklistKeys } = require("./section.common");
const { getMaterials } = require("../../models/material.model");

module.exports = catchAsync(async function (req, res, next) {
  const { sectionId } = req.params;

  if (!sectionId) return next(new AppError("Please include a section ID.", 422));

  // check if user owns the section through the material
  const section = await getSection(sectionId);
  if (!section) return next(new AppError("Section with that ID not found.", 422));
  
  const materialResult = await getMaterials(req.user.id, { id: section.material_id });
  const materialForSection = materialResult[0];

  if (!materialForSection || materialForSection.user_id !== req.user.id) {
    return next(new AppError("Section with that ID not found.", 404));
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
      "section",
      { material_id: materialForSection.id },
      position,
      false
    );
  }

  if (checklist) {
    const cleanedChecklist = {};

    Object.keys(checklist).forEach(key => {
      // if key is not in sectionChecklistKeys, ignore
      if (!sectionChecklistKeys.includes(key)) return;

      // if value is not a boolean, ignore
      if (typeof(checklist[key]) !== "boolean") return;

      cleanedChecklist[key] = checklist[key];
    });

    updates.checklist = cleanedChecklist
  }

  await updateSection(materialForSection.id, sectionId, updates);

  sendResponse(res, 204);
});
