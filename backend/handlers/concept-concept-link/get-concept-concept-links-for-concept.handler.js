const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptConceptLinksForConcept, getMaterialLinksForConcept } = require("../../models/concept-concept-link.model");
const { processConceptConceptLinks } = require("./concept-concept-link.common");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const linksToReturn = {};

  if ("concepts" in req.query) {
    const conceptConceptLinksFlat = await getConceptConceptLinksForConcept(conceptId);
    const conceptConceptLinks = processConceptConceptLinks(conceptId, conceptConceptLinksFlat);

    linksToReturn.conceptConceptLinks = conceptConceptLinks;
  }

  if ("materials" in req.query) {
    const materialLinksRaw = await getMaterialLinksForConcept(conceptId);
    const materialLinks = materialLinksRaw.map(materialLink => materialLink.id);

    linksToReturn.materialLinks = materialLinks;
  }

  sendResponse(res, 200, linksToReturn);
});
