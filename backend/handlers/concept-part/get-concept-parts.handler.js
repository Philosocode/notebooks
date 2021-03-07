const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getConceptPartsForPart } = require("../../models/concept-part.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  const conceptParts = await getConceptPartsForPart(partId);

  sendResponse(res, 200, { conceptParts });
});
