const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptConceptLinksForConcept, getNotebookLinksForConcept } = require("../../models/concept-concept-link.model");
const { processConceptConceptLinks } = require("./concept-concept-link.common");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const linksToReturn = {};

  if ("concepts" in req.query) {
    const conceptConceptLinksFlat = await getConceptConceptLinksForConcept(conceptId);
    const conceptConceptLinks = processConceptConceptLinks(conceptId, conceptConceptLinksFlat);

    linksToReturn.conceptConceptLinks = conceptConceptLinks;
  }

  if ("notebooks" in req.query) {
    const notebookLinksRaw = await getNotebookLinksForConcept(conceptId);
    const notebookLinks = notebookLinksRaw.map(notebookLink => notebookLink.id);

    linksToReturn.notebookLinks = notebookLinks;
  }

  sendResponse(res, 200, linksToReturn);
});
