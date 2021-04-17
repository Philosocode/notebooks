const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getSection } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res) {
  const { sectionId } = req.params;

  const section = await getSection(sectionId);

  sendResponse(res, 200, { section });
});
