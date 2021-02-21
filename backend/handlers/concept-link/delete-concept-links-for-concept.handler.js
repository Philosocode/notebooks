const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteConceptLinksForConcept } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  await deleteConceptLinksForConcept(conceptId);

  sendResponse(res, 204);
});
