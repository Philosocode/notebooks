const { getConcepts } = require("../../models/concept.model");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const concepts = await getConcepts(userId);

  sendResponse(res, 200, { concepts });
});