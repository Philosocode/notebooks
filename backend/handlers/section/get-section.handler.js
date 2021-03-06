const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getSections } = require("../../models/section.model");

module.exports = catchAsync(async function (req, res) {
  const { partId, sectionId } = req.params;

  if (!sectionId) return next(new AppError("Please include a section ID.", 422));

  const sectionResult = await getSections(partId, { id: sectionId });

  if (sectionResult.length === 0) {
    return sendResponse(res, 404, null, "Section with that ID not found.");
  }

  const section = sectionResult[0];

  sendResponse(res, 200, { section });
});
