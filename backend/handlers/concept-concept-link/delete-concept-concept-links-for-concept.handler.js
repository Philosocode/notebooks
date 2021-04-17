const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteConceptConceptLinksForConcept } = require("../../models/concept-concept-link.model");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  await deleteConceptConceptLinksForConcept(conceptId);

  sendResponse(res, 204);
});
