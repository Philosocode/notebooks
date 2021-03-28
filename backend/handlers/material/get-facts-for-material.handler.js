const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFactsForMaterial } = require("../../models/material.model");

module.exports = catchAsync(async function (req, res) {
  const { materialId } = req.params;

  let mastered;
  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  const factsForMaterial = await getFactsForMaterial(materialId, mastered);

  sendResponse(res, 200, { facts: factsForMaterial });
});
