const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteMaterial } = require("../../models/material.model");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const { materialId } = req.params;

  await deleteMaterial(userId, materialId);

  sendResponse(res, 204);
});