const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptLinksForConcept } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const conceptLinks = await getConceptLinksForConcept(conceptId);

  sendResponse(res, 200, { conceptLinks });
});
