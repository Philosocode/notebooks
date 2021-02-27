const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createMaterial } = require("../../models/material.model");
const { entityExists } = require("../../models/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { name, tags } = req.body;

  // Validations: name not empty, material with that name doesn't already exist
  if (!name.trim()) {
    return next(new AppError("Must include a name when adding a material", 422));
  }

  const exists = await entityExists("material", { name, user_id: userId });
  if (exists) {
    return next(new AppError("Material with that name already exists", 409));
  }

  const createdMaterial = await createMaterial(userId, name, tags);

  sendResponse(res, 201, {
    material: createdMaterial
  });
});
