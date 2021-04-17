const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptSectionLinksForSection } = require("../../models/concept-section-link.model");

module.exports = catchAsync(async function (req, res) {
  const { sectionId } = req.params;

  const conceptSectionLinks = await getConceptSectionLinksForSection(sectionId);

  sendResponse(res, 200, { conceptSectionLinks });
});
