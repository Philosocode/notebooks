const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFacts } = require("../../models/fact.model");

module.exports = catchAsync(async function (req, res) {
  const { partId } = req.params;

  const facts = await getFacts(partId);

  sendResponse(res, 200, { facts });
});
