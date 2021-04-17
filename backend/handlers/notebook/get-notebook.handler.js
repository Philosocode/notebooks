const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getNotebooks } = require("../../models/notebook.model");
const { mergeEntityWithTags } = require("../tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const { notebookId } = req.params;

  // include tags & links if query params passed
  const options = {
    include: {
      tags: "tags" in req.query,
    },
    filter: {
      "notebook.id": notebookId,
    }
  }

  const notebookFlat = await getNotebooks(userId, options);
  const notebookMerged = mergeEntityWithTags(notebookFlat)[0];

  sendResponse(res, 200, {
    notebook: notebookMerged
  });
});
