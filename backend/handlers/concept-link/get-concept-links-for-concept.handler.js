const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptLinksForConcept } = require("../../models/concept-link.model");
const { processConceptLinks } = require("./concept-link.common");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const conceptLinksFlat = await getConceptLinksForConcept(conceptId);
  const conceptLinks = processConceptLinks(conceptId, conceptLinksFlat);

  sendResponse(res, 200, { conceptLinks });
});
