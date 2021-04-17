const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptLinksForConcept, getMaterialLinksForConcept } = require("../../models/concept-link.model");
const { processConceptLinks } = require("./concept-concept-link.common");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const linksToReturn = {};

  if ("concepts" in req.query) {
    const conceptLinksFlat = await getConceptLinksForConcept(conceptId);
    const conceptLinks = processConceptLinks(conceptId, conceptLinksFlat);

    linksToReturn.conceptLinks = conceptLinks;
  }

  if ("materials" in req.query) {
    const materialLinksRaw = await getMaterialLinksForConcept(conceptId);
    const materialLinks = materialLinksRaw.map(materialLink => materialLink.id);

    linksToReturn.materialLinks = materialLinks;
  }

  sendResponse(res, 200, linksToReturn);
});
