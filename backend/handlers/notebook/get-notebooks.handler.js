const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getNotebooks } = require("../../models/notebook.model");
const { mergeEntityWithTags } = require("../tag/tag.common");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;

  const options = {
    include: {
      tags: "tags" in req.query,
    }
  };

  const notebooksFlat = await getNotebooks(userId, options);
  const notebooksMerged = mergeEntityWithTags(notebooksFlat);

  sendResponse(res, 200, { notebooks: notebooksMerged });
});