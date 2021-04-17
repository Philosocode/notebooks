const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptLinksForNotebook } = require("../../models/notebook.model");

module.exports = catchAsync(async function (req, res) {
  const { notebookId } = req.params;

  const conceptsForNotebooksFlat = await getConceptLinksForNotebook(notebookId);
  const conceptLinks = conceptsForNotebooksFlat.map(link => link.concept_id);

  sendResponse(res, 200, { conceptLinks });
});
