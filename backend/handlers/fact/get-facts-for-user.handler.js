const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFactsForUser } = require("../../models/fact.model");

module.exports = catchAsync(async function (req, res) {
  let mastered;

  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  const facts = await getFactsForUser(req.user.id, mastered);

  sendResponse(res, 200, { facts });
});
