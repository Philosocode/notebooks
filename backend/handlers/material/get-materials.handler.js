const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getMaterials } = require("../../models/material.model");
const { mergeEntityWithTags } = require("../tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;

  const options = {
    include: {
      tags: "tags" in req.query,
    }
  };

  const materialsFlat = await getMaterials(userId, options);
  const materialsMerged = mergeEntityWithTags(materialsFlat);

  sendResponse(res, 200, { materials: materialsMerged });
});