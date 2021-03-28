const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFactsForPart } = require("../../models/part.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  let mastered;
  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  const factsForPart = await getFactsForPart(partId, mastered);

  sendResponse(res, 200, { facts: factsForPart });
});
