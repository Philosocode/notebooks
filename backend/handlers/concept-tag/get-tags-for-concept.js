const { getTagsForConcept } = require("../../models/concept-tag.model");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const tags = await getTagsForConcept(conceptId);

  sendResponse(res, 200, { tags });
});