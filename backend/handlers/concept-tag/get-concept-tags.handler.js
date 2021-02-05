const { getConceptTags } = require("../../models/concept-tag.model");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");

module.exports = catchAsync(async function (req, res) {
  const tags = await getConceptTags(req.user.id);

  sendResponse(res, 200, { tags });
});