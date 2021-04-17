const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptLinksForMaterial } = require("../../models/material.model");

module.exports = catchAsync(async function (req, res) {
  const { materialId } = req.params;

  const conceptsForMaterialsFlat = await getConceptLinksForMaterial(materialId);
  const conceptLinks = conceptsForMaterialsFlat.map(link => link.concept_id);

  sendResponse(res, 200, { conceptLinks });
});
