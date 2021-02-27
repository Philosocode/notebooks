const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getMaterials } = require("../../models/material.model");
const { mergeEntityWithTags } = require("../tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const { materialId } = req.params;

  // include tags & links if query params passed
  const options = {
    include: {
      tags: "tags" in req.query,
    },
    filter: {
      "material.id": materialId,
    }
  }

  const materialFlat = await getMaterials(userId, options);
  const materialMerged = mergeEntityWithTags(materialFlat)[0];

  sendResponse(res, 200, {
    material: materialMerged
  });
});
