const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteSection } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res, next) {
  const { sectionId } = req.params;

  await deleteSection(sectionId);

  sendResponse(res, 204);
});