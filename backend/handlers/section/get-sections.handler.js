const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getSections } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res, next) {
  const { materialId } = req.params;

  const sections = await getSections(materialId);

  sendResponse(res, 200, { sections });
});
