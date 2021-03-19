const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFactsForMaterial } = require("../../models/material.model");

module.exports = catchAsync(async function (req, res) {
  const { materialId } = req.params;

  const factsForMaterial = await getFactsForMaterial(materialId);

  sendResponse(res, 200, { facts: factsForMaterial });
});
